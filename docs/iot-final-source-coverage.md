# IoT Final — source coverage

Selected study scope: Week9–12, **89022567 Basic Electronics and Internet of Things**, reviewed2026-10-29. This is not a confirmed complete official Final syllabus or an exam-weight prediction. Existing course ID remains `internet-of-things`.

All seven named originals were actually opened locally. The manifest `รายการไฟล์หลังกลางภาค.md` contains links only and is not content evidence. Week12's PDF, previously unverified, is now available and inspected. Original teaching files remain private/read-only; no submissions, student identities or slide copies are published. Original hashes are retained in the private audit snapshot.

| ID | Original/version | Real locator and inspected evidence | Implemented lessons | Status |
|---|---|---|---|---|
| W09 | IoT_Week9.pptx,37slides | slides3–13 sensor photos/specs/timing/limitations;14–16 time-of-flight and500µs→8.575cm;17–19 water-level code/circuit/flowchart;20–36 applications/scenario |01–04|Lecturer content verified; hardware specs require module qualification|
| A09 | Assignments 9.docx | requirements1–2; renderedp.1 (p.2blank): ESP32/ultrasonic,60cmgreen/40cmyellow/20cmred,flowchart/program/wiring/video,formula explanation |03–04|Verified requirements; sample distances are not general range boundaries|
| A10 | Assignments 10.docx | tasks1–2, renderedpp.1–2; gradingpp.2–3: ten commands and three sensor programs; handwritten submission requirement; genericA0/0..1023/map example |02,05|Verified; adapt ADC assumptions to selected ESP32 rather than universalize10bits|
| A11 | Assignments 11.docx | renderedpp.1–3: principles,groupby I2C/SPI/UART/GPIO/ADC,wiring,annotatedcode; GPIO34soilread onp.3; rubricp.4 (p.5blank) |02,06|Verified; AO and DO represent different interfaces on a module|
| W12 | ใบงานที่ 12.docx | functions/deliverables renderedpp.1–2, rubricpp.2–3: PIR→relay→LED,10s inactivity,retrigger,Motion Detected/No Motion,OLED lamp status |07–09|Verified requirements; exact module/pins/polarity/display address unspecified|
| S12 | Slide-Week12.pdf,27physicalpages | pp.2–6 PIR structure/zones;7–13 applications/lenses;14–19 relay/NO/NC/driver/ESP8266 example;20–23 OLED/I2C/coordinates;24–27 AdafruitSSD1306/DHT displaycode |06–09|Verified images and code; circuit is not universal ESP32 wiring|
| B | IoT_book.pdf,115physicalpages | pp.5–16 IoT/components;19–27 chip/module/board/GPIO;29–42 IDE; selectedelectronics/sensorspp.45–73;75–98 syntax/digital/ADC/Serial;107–115 input-to-output examples |01–02,05–06|Relevant sections verified; historical board/library assumptions qualified|

DOCX pages refer to a private ONLYOFFICE PDF rendering, not immutable native Word page numbers; task/section locators are authoritative. PPTX rendering preserved37slides. Original PowerPoint COM was unavailable, so ONLYOFFICE rendering plus OOXML/media inspection and Poppler images were used. `Slide-Week12 (1).pdf` is a byte-identical duplicate, not additional independent evidence. The separate project report and other authored deliverables are **not** substituted for original teaching evidence.

## Necessary qualifications and corrections

- **C01 — A10/task2:**0..1023 describes a10-bit example. Selected classic ESP32 uses an explicitly configured12-bit reading0..4095. `map()` is integer arithmetic and an uncalibrated mapping is not a measured soil-moisture percentage.
- **C02 — W09/slides9,12,18:**a broad3.3–5V table/direct-looking diagram does not prove compatibility of every HC-SR04 clone. Classic5V HC-SR04 reference and ESP32 GPIO limits require checking Echo level and adding a verified divider/level shifter when necessary; LEDs need current-limiting resistors. Never infer safe wiring from the simplified illustration alone.
- **C03 — W09/slide19:**the depicted tests leave100..200 (inclusive) uncovered, and do not define a justified mapping to A09's three samples. Teach a complete, explicitly authored range policy with boundary/error tests, not the slide diagram as an official threshold table.
- **C04 — W12/S12:**PIR detects changes in infrared radiation; it does not guarantee continuous occupancy or identify a person. HIGH hold/retrigger timing affects when software observes inactivity.
- **C05 — S12/pp.16–19:**ESP8266 and example relay/driver pictures do not establish ESP32 pin mapping, module polarity, isolation or mains safety. Use only a low-voltage LED/load with a verified compatible driver/module; never drive a relay coil from GPIO.
- **C06 — S12/pp.21–27:**OLED examples include DHT temperature/humidity; this is not a provided complete PIR+relay firmware or measured test result. The integrated program is authored supplementary code with explicitly chosen display/library/pins.

- **C07 — B/physicalp.96 (printedp.94):** `raw × 3.3 / 4095` is an ideal linear mapping, not proof of calibrated voltage across ESP32 attenuation/nonlinearity. Teach the raw/calibrated distinction and the appropriate API; the original example remains untouched. Visual inspection also confirmed board/header and GPIO distinctions on physicalpp.22,27 and input/output behavior onp.114.

## Curriculum decision

Nine focused lessons cover all nine substantive proposed topics. Integrated debugging/circuit/timing scenarios appear within their relevant lessons and exam banks; no repetitive tenth chapter is created solely to raise the count. New examples, calculations, pin assignments, thresholds and question keys are labelled supplementary. No official exam answers, hardware observations or guaranteed exam scope are invented.

## Independent technical evidence

Accessed2026-10-29:

- [ESP32 Series datasheet v5.3](https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf): selected classic ESP32 GPIO restrictions and electrical characteristics; not all ESP32-family boards share these pins.
- [Arduino-ESP32 GPIO](https://docs.espressif.com/projects/arduino-esp32/en/latest/api/gpio.html), [ADC](https://docs.espressif.com/projects/arduino-esp32/en/latest/api/adc.html), [I2C](https://docs.espressif.com/projects/arduino-esp32/en/latest/api/i2c.html), [SPI](https://docs.espressif.com/projects/arduino-esp32/en/latest/api/spi.html), [UART](https://docs.espressif.com/projects/arduino-esp32/en/latest/api/serial.html).
- [HC-SR04 module reference](https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf): trigger/echo/roundtrip/supply/cycle limits for the referenced module, not clone certification. Its340m/s convention differs from the lesson's explicit343m/s assumption.
- [Arduino pulseIn](https://docs.arduino.cc/language-reference/en/functions/advanced-io/pulseIn/), [millis](https://docs.arduino.cc/language-reference/en/functions/time/millis/), [map](https://docs.arduino.cc/language-reference/en/functions/math/map/).
- [Adafruit PIR principles](https://learn.adafruit.com/pir-passive-infrared-proximity-motion-sensor/how-pirs-work) and [SSD1306 maintained example](https://github.com/adafruit/Adafruit_SSD1306/blob/master/examples/ssd1306_128x64_i2c/ssd1306_128x64_i2c.ino).

Originals missing: **none of the seven requested files**. Still unverified: actual board/module serials/revisions, real wiring, Echo/relay signal voltages, calibrated sensor accuracy, measured OLED address/timing, physical test videos and official examination scope. Compile/simulation results never establish these physical facts.
