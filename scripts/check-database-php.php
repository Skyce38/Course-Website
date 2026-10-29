<?php
declare(strict_types=1);
/* Authoring-only integration test. Refuses HTTP, normal database names and unguarded servers. */
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
require __DIR__.'/../courses/database-management/examples/learning-examples.php';
use function StudyDatabase\{h,positiveId,skillInput,skills,createSkill,updateSkill,deleteSkill,
    register,authenticate,startSession,finishLogin,actorProfile,checkCsrf,logout};

function ensure(bool $condition, string $message): void {
    if (!$condition) throw new RuntimeException($message);
}
function rejects(string $class, callable $fn): void {
    try { $fn(); } catch (Throwable $error) { ensure($error instanceof $class, 'Unexpected exception type'); return; }
    throw new RuntimeException('Expected rejection');
}
function numberRows(mysqli $conn, string $sql): int {
    return (int)mysqli_fetch_row(mysqli_query($conn,$sql))[0];
}
$host = getenv('STUDY_DB_HOST'); $port = (int)getenv('STUDY_DB_PORT');
$guard = realpath((string)getenv('STUDY_DB_DATADIR'));
ensure($host==='127.0.0.1' && $port>1024 && $port<=65535 && $guard!==false &&
    is_file($guard.'/.phase16-disposable'), 'Explicit disposable local server required');
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = mysqli_connect($host,(string)getenv('STUDY_DB_USER'),(string)getenv('STUDY_DB_PASS'),null,$port);
$serverDir = realpath((string)mysqli_fetch_row(mysqli_query($conn,'SELECT @@datadir'))[0]);
ensure($serverDir!==false && strtolower($serverDir)===strtolower($guard), 'Refuse an unrelated database server');
$database = 'phase16_'.bin2hex(random_bytes(6));
ensure((bool)preg_match('/^phase16_[a-f0-9]{12}$/',$database),'Safe disposable database name');
$report = ['php'=>PHP_VERSION,'engine'=>mysqli_get_server_info($conn),'isolation'=>'fresh guarded disposable database',
    'queries'=>[], 'checks'=>[]];
mysqli_query($conn,"CREATE DATABASE `$database` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
mysqli_select_db($conn,$database); mysqli_set_charset($conn,'utf8mb4');
try {
    // Authored DDL mirrors reviewed column/key contracts; no supplied SQL script is imported.
    foreach ([
        'CREATE TABLE students(student_id INT PRIMARY KEY,student_name VARCHAR(100) NOT NULL,faculty VARCHAR(100) NOT NULL)',
        'CREATE TABLE restaurants(restaurant_id INT PRIMARY KEY,restaurant_name VARCHAR(120) NOT NULL,category VARCHAR(80) NOT NULL)',
        'CREATE TABLE orders(order_id INT PRIMARY KEY,student_id INT NOT NULL,order_date DATE NOT NULL,total_amount DECIMAL(10,2) NOT NULL,status VARCHAR(30) NOT NULL,FOREIGN KEY(student_id) REFERENCES students(student_id))',
        'CREATE TABLE order_items(item_id INT PRIMARY KEY,order_id INT NOT NULL,restaurant_id INT NOT NULL,menu_name VARCHAR(150) NOT NULL,qty INT NOT NULL,FOREIGN KEY(order_id) REFERENCES orders(order_id),FOREIGN KEY(restaurant_id) REFERENCES restaurants(restaurant_id))',
        'CREATE INDEX idx_orders_student_id ON orders(student_id)',
        'CREATE INDEX idx_items_order_id ON order_items(order_id)',
        'CREATE INDEX idx_items_restaurant_id ON order_items(restaurant_id)',
        'CREATE TABLE slide_students LIKE students', 'CREATE TABLE slide_orders LIKE orders',
        'CREATE TABLE profile(id INT AUTO_INCREMENT PRIMARY KEY,full_name VARCHAR(150) NOT NULL,email VARCHAR(150))',
        'CREATE TABLE skill(id INT AUTO_INCREMENT PRIMARY KEY,profile_id INT NOT NULL,skill_name VARCHAR(120) NOT NULL,skill_level VARCHAR(50),FOREIGN KEY(profile_id) REFERENCES profile(id) ON DELETE CASCADE)',
        'CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY,profile_id INT NOT NULL UNIQUE,email VARCHAR(190) NOT NULL UNIQUE,password_hash VARCHAR(255) NOT NULL,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(profile_id) REFERENCES profile(id) ON DELETE CASCADE)'
    ] as $ddl) mysqli_query($conn,$ddl);
    $fixture = json_decode(file_get_contents(__DIR__.'/../courses/database-management/examples/campus-fixture.json'),true,512,JSON_THROW_ON_ERROR);
    foreach ($fixture['tables'] as $table=>$rows) {
        ensure(in_array($table,['students','restaurants','orders','order_items'],true),'Known fixture table');
        foreach ($rows as $row) {
            $columns = implode(',',array_keys($row)); $marks=implode(',',array_fill(0,count($row),'?'));
            $stmt=mysqli_prepare($conn,"INSERT INTO $table($columns) VALUES ($marks)");
            $values=array_map('strval',array_values($row)); $types=str_repeat('s',count($row));
            mysqli_stmt_bind_param($stmt,$types,...$values); mysqli_stmt_execute($stmt);mysqli_stmt_close($stmt);
        }
    }
    mysqli_query($conn,'INSERT INTO slide_students SELECT * FROM students WHERE student_id<=104');
    mysqli_query($conn,'INSERT INTO slide_orders SELECT * FROM orders WHERE order_id<=5003');
    $spec=json_decode(file_get_contents(__DIR__.'/database-queries.json'),true,512,JSON_THROW_ON_ERROR);
    foreach ($spec['cases'] as $case) {
        ensure((bool)preg_match('/^(SELECT|EXPLAIN)\s/i',$case['sql']) && !str_contains($case['sql'],';'),'Reviewed read-only case');
        $result=mysqli_query($conn,$case['sql']);
        $report['queries'][$case['id']]=mysqli_fetch_all($result,MYSQLI_NUM);
    }
    ensure(numberRows($conn,'SELECT COUNT(*) FROM students')===8,'Source student count');
    ensure(numberRows($conn,'SELECT COUNT(*) FROM restaurants')===6,'Source restaurant count');
    ensure(numberRows($conn,'SELECT COUNT(*) FROM orders')===10,'Source order count');
    ensure(numberRows($conn,'SELECT COUNT(*) FROM order_items')===14,'Source item count');
    rejects(mysqli_sql_exception::class,fn()=>mysqli_query($conn,"INSERT INTO orders VALUES(5999,999,'2026-01-01',1,'delivered')"));
    rejects(mysqli_sql_exception::class,fn()=>mysqli_query($conn,"INSERT INTO students VALUES(101,'duplicate','Example')"));
    $report['checks'][]='original simulated dataset counts,duplicate PK and invalid FK';

    mysqli_query($conn,"INSERT INTO profile(full_name,email) VALUES('Study Demo A','a@example.invalid'),('Study Demo B','b@example.invalid')");
    mysqli_query($conn,"INSERT INTO skill(profile_id,skill_name,skill_level) VALUES(1,'PHP','Intermediate'),(1,'MySQL','Intermediate'),(1,'Git','Beginner'),(2,'Other owner','Advanced')");
    ensure(array_column(skills($conn,1),'skill_name')===['PHP','MySQL','Git'],'Ordered associative row fetch');
    ensure(skills($conn,999)===[],'Empty read');
    ensure(h("<img src=x> & '\"")==='&lt;img src=x&gt; &amp; &#039;&quot;','HTML escaping');
    ensure(h(null)==='' && str_contains(h("\xFF"),"\u{FFFD}"),'Substitute invalid UTF8');
    foreach ([0,-1,'1 OR 1=1',[],null,'1.5'] as $raw) rejects(InvalidArgumentException::class,fn()=>positiveId($raw));
    ensure(positiveId('7')===7,'Valid ID');
    foreach ([['','Beginner'],[str_repeat('ก',121),'Beginner'],['SQL','root'],[[],'Beginner']] as $pair)
        rejects(InvalidArgumentException::class,fn()=>skillInput(...$pair));
    $sid=createSkill($conn,1,"O'Reilly <SQL>",'Beginner');
    ensure(count(skills($conn,1))===4,'Prepared insertion');
    ensure(updateSkill($conn,2,$sid,'stolen','Advanced')===0,'Wrong owner update blocked');
    ensure(updateSkill($conn,1,$sid,'SQL','Advanced')===1,'Owner update');
    ensure(updateSkill($conn,1,$sid,'SQL','Advanced')===0,'Unchanged value has zero affected rows');
    ensure(deleteSkill($conn,2,$sid)===0 && deleteSkill($conn,1,$sid)===1,'Owner deletion');
    ensure(numberRows($conn,'SELECT COUNT(*) FROM skill WHERE profile_id=2')===1,'Other owner unchanged');
    $report['checks'][]='mysqli ordered fetch,scalar/UTF8 validation,escaping,prepared CRUD and ownership';

    $pass='harmless-fixture-only';
    $u1=register($conn,'Fixture User A','fixture-a@example.invalid',$pass);
    $u2=register($conn,'Fixture User B','fixture-b@example.invalid',$pass);
    $before=numberRows($conn,'SELECT COUNT(*) FROM profile');
    rejects(mysqli_sql_exception::class,fn()=>register($conn,'Duplicate User','fixture-a@example.invalid',$pass));
    ensure(numberRows($conn,'SELECT COUNT(*) FROM profile')===$before,'Duplicate registration rolls back profile');
    $a=authenticate($conn,'FIXTURE-A@example.invalid',$pass); $b=authenticate($conn,'fixture-b@example.invalid',$pass);
    ensure($a!==null && $b!==null && $a['user_id']===$u1 && $a['profile_id']!==$b['profile_id'],'Verified separate owners');
    ensure(authenticate($conn,'fixture-a@example.invalid','incorrect-password')===null,'Wrong password rejected');
    ensure(authenticate($conn,"x' OR 1=1 -- ",$pass)===null,'Injection does not bypass login');
    $hashes=mysqli_fetch_all(mysqli_query($conn,'SELECT password_hash FROM users ORDER BY id'),MYSQLI_NUM);
    ensure($hashes[0][0]!==$hashes[1][0] && password_verify($pass,$hashes[0][0]),'Salted hashes verify without equality');
    $report['checks'][]='password_hash/verify,duplicate-email rollback,injection denial and distinct profiles';

    $sessionDir=(string)getenv('STUDY_DB_SESSION_DIR');
    ensure(is_dir($sessionDir),'Explicit temporary session path'); session_save_path($sessionDir);
    startSession(false);$oldId=session_id();finishLogin($a);
    ensure(session_id()!==$oldId && actorProfile($_SESSION)===$a['profile_id'],'Actual session rotation/guard');
    $token=$_SESSION['csrf'];checkCsrf('POST',$token,$_SESSION);
    rejects(RuntimeException::class,fn()=>checkCsrf('GET',$token,$_SESSION));
    rejects(RuntimeException::class,fn()=>checkCsrf('POST','wrong',$_SESSION));
    rejects(RuntimeException::class,fn()=>actorProfile([]));
    $owned=createSkill($conn,actorProfile($_SESSION),'Owner A skill','Beginner');
    ensure(updateSkill($conn,$b['profile_id'],$owned,'stolen','Advanced')===0,'Two actual registered users stay isolated');
    logout();ensure($_SESSION===[] && session_status()!==PHP_SESSION_ACTIVE,'Logout clears session');
    rejects(RuntimeException::class,fn()=>actorProfile($_SESSION));
    $report['checks'][]='real PHP CLI session rotation,POST+CSRF,registered-owner isolation and logout';
    $report['limits']='MariaDB11.4,not native MySQL;PHP CLI+mysqli integration,not Apache/HTTPS/Angsila deployment';
} finally {
    // Only this process's fresh random database on the guarded temporary server is removed.
    mysqli_query($conn,"DROP DATABASE `$database`");mysqli_close($conn);
}
echo json_encode($report,JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR),"\n";
