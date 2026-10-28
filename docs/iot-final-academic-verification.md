# IoT Final — academic verification

Reviewed 2026-10-29. Original-source evidence is separated from official API specifications, independent calculation, compilation, controlled simulation and unperformed hardware tests. See [source ledger](iot-final-source-coverage.md).

## Technical assumptions

Examples target classic ESP32-WROOM, FQBN `esp32:esp32:esp32`, Arduino-ESP32 3.3.11. Board variants differ. GPIO34 is input-only with no internal pulls; external LED examples use output-capable pins and separate current-limiting resistors. USB/VIN acceptance does not imply 5V-tolerant GPIO. Check actual module voltages/thresholds/loading before connecting anything. A nominal 10k/15k divider gives 3.0V at 5V input; tolerance and real module behavior remain unverified. No direct relay-coil GPIO drive or mains/breadboard instructions.

## Formula and code verification method

`scripts/iot-verification.json` maps every automatic key to its topic, original evidence locator, official reference and calculation/compile classification. Exact rational/decimal oracles independently check units, round-trip distance, time conversions, ADC counts, divider/LED calculations and rounding. C++ keys are checked using compiler static assertions; full sketches compile against the installed target and libraries. Controlled timer traces check startup, retrigger, exact timeout, rollover and separate motion/lamp states against an unwrapped-time oracle.

- Sound speed is explicitly 343m/s (0.0343cm/µs) for lesson arithmetic, not a universal physical constant. W09's 500µs gives 8.575cm one-way. The module reference also uses 340m/s / approximate t/58; do not mix conventions.
- A09 distances 60/40/20cm are samples. Complete 30/50cm range boundaries are authored policy with invalid-input handling, not lecturer thresholds.
- ADC12 has 4096 codes, maximum4095. Raw ADC is uncalibrated; `map()` uses integer arithmetic. No invented measured moisture percentage.
- Ten-second inactivity begins at latest observed HIGH sample, not necessarily the actual instant a person stopped moving. Unsigned32 elapsed subtraction handles wrap subject to polling before an entire wrap is missed.
- OLED0x3C,128x64,pin choices and active-LOW relay are authored assumptions. Buffer changes need `display()`; I2C is not hard real time.

## Limitations

No board upload, physical wiring verification, calibrated measurement, oscilloscope trace, real OLED scan, video or hardware safety certification was performed. Compilation/simulation cannot establish these facts. The selected Week9–12 scope is not a guaranteed complete Final examination syllabus.

## Executed results

- PASS: Python3.12.14 exact rational/decimal checks for28 numeric keys. C++ static assertions independently validate the remaining27 numeric/code keys with the actual ESP32 toolchain.170 MC keys/distractors are source/official-reference reviewed;45 rubrics are manually reviewed, not executable grading proofs.
- PASS: nine complete authored sketches compile using Arduino CLI1.5.1, `esp32:esp32:esp32`, core3.3.11, Adafruit SSD1306 2.5.17, GFX1.12.6 and BusIO1.17.4. No tools/libraries were installed or updated. A final verification sketch tests the current27 keys, ten startup/retrigger/deadline/rollover states and eight exact authored water-classifier cases.
- PASS: 15 independent water boundary/invalid cases;3000 deterministic randomized timer observations compared against an absolute unwrapped-time oracle, plus explicit startup, simultaneous-motion/deadline and rollover cases.
- PASS: Echo500µs at343m/s gives8.575cm; nominal divider5V×15/(10+15)=3V; LED current(3.3−2)/330≈3.939394mA; 12-bit ADC4096 codes/max4095; 128×64 monochrome framebuffer1024bytes; text `Motion Detected` contains15 characters,90px at the stated6px advance.

These executions verify arithmetic, language/API compatibility and the stated model, never physical hardware. Source slide19's missing100..200 branch and the idealized book ADC conversion are qualified in the actual student-facing lesson, not merely in this ledger. Existing AI/OOP independent checks passed against unchanged lessons; optional old private workbook rereads were not requested/repeated and are not claimed.
