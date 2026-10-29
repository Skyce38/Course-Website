<?php
declare(strict_types=1);

/* Authored teaching helpers, not a deployed website. Connections are supplied by the caller.
 * No credentials, source .env loading, automatic SQL execution or network connection here.
 * Verified with PHP8.4 and the separately isolated MariaDB test fixture. */
namespace StudyDatabase;

// snippet:escaping
function h(mixed $value): string {
    return htmlspecialchars((string)$value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
// end:escaping

// snippet:select
function skills(\mysqli $conn, int $profileId): array {
    $stmt = mysqli_prepare($conn,
        'SELECT id,skill_name,skill_level FROM skill WHERE profile_id=? ORDER BY id');
    mysqli_stmt_bind_param($stmt, 'i', $profileId);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt); // requires mysqlnd; available in the tested PHP build
    $rows = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    mysqli_stmt_close($stmt);
    return $rows;
}
// end:select

// snippet:validation
function positiveId(mixed $raw): int {
    if (!is_int($raw) && !is_string($raw)) {
        throw new \InvalidArgumentException('Scalar ID required');
    }
    $id = filter_var($raw, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
    if ($id === false) throw new \InvalidArgumentException('Positive integer required');
    return $id;
}
function skillInput(mixed $name, mixed $level): array {
    if (!is_string($name) || !is_string($level) || !mb_check_encoding($name, 'UTF-8')) {
        throw new \InvalidArgumentException('UTF-8 text required');
    }
    $name = trim($name);
    if ($name === '' || mb_strlen($name, 'UTF-8') > 120 ||
        !in_array($level, ['Beginner','Intermediate','Advanced'], true)) {
        throw new \InvalidArgumentException('Invalid skill');
    }
    return [$name, $level];
}
// end:validation

// snippet:create
function createSkill(\mysqli $conn, int $sessionProfileId, mixed $name, mixed $level): int {
    positiveId($sessionProfileId);
    [$name, $level] = skillInput($name, $level);
    $stmt = mysqli_prepare($conn,
        'INSERT INTO skill(profile_id,skill_name,skill_level) VALUES (?,?,?)');
    mysqli_stmt_bind_param($stmt, 'iss', $sessionProfileId, $name, $level);
    mysqli_stmt_execute($stmt);
    $id = mysqli_insert_id($conn);
    mysqli_stmt_close($stmt);
    return $id;
}
// end:create

// snippet:update
function updateSkill(\mysqli $conn, int $sessionProfileId, int $id, mixed $name, mixed $level): int {
    positiveId($sessionProfileId); positiveId($id);
    [$name, $level] = skillInput($name, $level);
    $stmt = mysqli_prepare($conn,
        'UPDATE skill SET skill_name=?,skill_level=? WHERE id=? AND profile_id=?');
    mysqli_stmt_bind_param($stmt, 'ssii', $name, $level, $id, $sessionProfileId);
    mysqli_stmt_execute($stmt);
    $changed = mysqli_stmt_affected_rows($stmt);
    mysqli_stmt_close($stmt);
    return $changed; // 0 also means an existing row already had these values
}
// end:update

// snippet:delete
function deleteSkill(\mysqli $conn, int $sessionProfileId, int $id): int {
    positiveId($sessionProfileId); positiveId($id);
    $stmt = mysqli_prepare($conn, 'DELETE FROM skill WHERE id=? AND profile_id=?');
    mysqli_stmt_bind_param($stmt, 'ii', $id, $sessionProfileId);
    mysqli_stmt_execute($stmt);
    $changed = mysqli_stmt_affected_rows($stmt);
    mysqli_stmt_close($stmt);
    return $changed;
}
// end:delete

// snippet:csrf
function checkCsrf(string $method, mixed $submitted, array $session): void {
    if ($method !== 'POST' || !is_string($submitted) ||
        !is_string($session['csrf'] ?? null) || $session['csrf'] === '' ||
        !hash_equals($session['csrf'], $submitted)) {
        throw new \RuntimeException('Forbidden request');
    }
}
// end:csrf

// snippet:register
function register(\mysqli $conn, string $name, string $email, string $password): int {
    $email = strtolower(trim($email)); $name = trim($name);
    // This lab policy is explicit, not a universal password-strength rule.
    // PHP8.4 PASSWORD_DEFAULT uses bcrypt, whose input limit is72 bytes.
    if (mb_strlen($name, 'UTF-8') < 2 || mb_strlen($name, 'UTF-8') > 150 ||
        !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 150 ||
        strlen($password) < 10 || strlen($password) > 72) {
        throw new \InvalidArgumentException('Invalid registration');
    }
    mysqli_begin_transaction($conn);
    try {
        $stmt = mysqli_prepare($conn, 'INSERT INTO profile(full_name,email) VALUES (?,?)');
        mysqli_stmt_bind_param($stmt, 'ss', $name, $email);
        mysqli_stmt_execute($stmt); $pid = mysqli_insert_id($conn); mysqli_stmt_close($stmt);
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = mysqli_prepare($conn,
            'INSERT INTO users(profile_id,email,password_hash) VALUES (?,?,?)');
        mysqli_stmt_bind_param($stmt, 'iss', $pid, $email, $hash);
        mysqli_stmt_execute($stmt); $uid = mysqli_insert_id($conn); mysqli_stmt_close($stmt);
        mysqli_commit($conn);
        return $uid;
    } catch (\Throwable $error) {
        mysqli_rollback($conn); throw $error; // HTTP layer must show a generic message, not DB details
    }
}
// end:register

// snippet:authenticate
function authenticate(\mysqli $conn, string $email, string $password): ?array {
    $email = strtolower(trim($email));
    $stmt = mysqli_prepare($conn,
        'SELECT id,profile_id,password_hash FROM users WHERE email=? LIMIT 1');
    mysqli_stmt_bind_param($stmt, 's', $email); mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $uid, $pid, $hash);
    $found = mysqli_stmt_fetch($stmt); mysqli_stmt_close($stmt);
    if (!$found || !password_verify($password, $hash)) return null;
    return ['user_id' => $uid, 'profile_id' => $pid];
}
// end:authenticate

// snippet:session
function startSession(bool $https): void {
    if (session_status() !== PHP_SESSION_ACTIVE) {
        ini_set('session.use_strict_mode', '1');
        ini_set('session.use_only_cookies', '1');
        session_set_cookie_params(['httponly'=>true, 'secure'=>$https, 'samesite'=>'Lax']);
        session_start();
    }
}
function finishLogin(array $verifiedUser): void {
    if (session_status() !== PHP_SESSION_ACTIVE ||
        !is_int($verifiedUser['user_id'] ?? null) || $verifiedUser['user_id'] < 1 ||
        !is_int($verifiedUser['profile_id'] ?? null) || $verifiedUser['profile_id'] < 1) {
        throw new \RuntimeException('Verified user and active session required');
    }
    session_regenerate_id(true);
    $_SESSION = ['user_id'=>$verifiedUser['user_id'], 'profile_id'=>$verifiedUser['profile_id'],
        'csrf'=>bin2hex(random_bytes(32))];
}
function actorProfile(array $session): int {
    if (!is_int($session['user_id'] ?? null) || $session['user_id'] < 1 ||
        !is_int($session['profile_id'] ?? null) || $session['profile_id'] < 1) {
        throw new \RuntimeException('Login required');
    }
    return $session['profile_id']; // never take the owner ID from a hidden form field
}
// end:session

// snippet:logout
function logout(): void {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', ['expires'=>time()-3600, 'path'=>$p['path'],
            'domain'=>$p['domain'], 'secure'=>$p['secure'], 'httponly'=>$p['httponly'],
            'samesite'=>$p['samesite'] ?? 'Lax']);
    }
    session_destroy();
}
// end:logout
