#include <ArduinoJson.h>
#include <AccelStepper.h>
#define enable 8

AccelStepper stepper1(1, 2, 5); // (Type:driver, STEP, DIR)
AccelStepper stepper2(1, 3, 6);
AccelStepper stepper3(1, 4, 7);
AccelStepper stepper4(1, 12, 13);

int neutral_type = 1;
int happy_type = 1;
int angry_type = 1;
int sad_type = 1;
int afraid_type = 1;
int status_current = 5;

//bool status_switched = true;

void setup() {
  // Start serial communication
  Serial.begin(115200);

  // Set pin 13 as an output
  pinMode(13, OUTPUT);

  pinMode(enable, OUTPUT);
  digitalWrite(enable, LOW);
  stepper1.setMaxSpeed(4000);
  stepper1.setAcceleration(2000);
  stepper2.setMaxSpeed(4000);
  stepper2.setAcceleration(2000);
  stepper3.setMaxSpeed(4000);
  stepper3.setAcceleration(2000);
  stepper4.setMaxSpeed(4000);
  stepper4.setAcceleration(2000);
}

void serialEvent() {
  if (Serial.available() > 0) {
    // Read the serial input
    String input = Serial.readString();
    Serial.print(input);
    status_current = input.toInt();
    stepper1.run();
    stepper2.run();
    stepper3.run();
    stepper4.run();
    // Check if the input is valid JSON
    
      // Check which function to call based on the status
  }
}

void loop() {
  //serialEvent();
  switch(status_current){
    case 0:
    neutral();
    // Serial.print("Case 0");
    break;
    case 1:
    happy();
    //Serial.print("Case 1");
    break;
    case 2:
    angry();
    //Serial.print("Case 2");
    break;
    case 3:
    sad();
    //Serial.print("Case 3");
    break;
    case 4:
    afraid();
    //Serial.print("Case 4");
    break;
    case 5:
    stop();
    //Serial.print("Case 5");
    break;
    case 6:
    motor1();
    //Serial.print("Case 5");
    break;
    case 7:
    motor2();
    //Serial.print("Case 5");
    break;
    case 8:
    motor3();
    //Serial.print("Case 5");
    break;
    case 9:
    motor4();
    //Serial.print("Case 5");
    break;
  }
}

void neutral() {
  if (stepper1.currentPosition() == 4800 && stepper2.currentPosition() == 0 && stepper3.currentPosition() == 0 && stepper4.currentPosition() == 4800) {
    neutral_type = 2;
  }
  if (stepper1.currentPosition() == 4800 && stepper2.currentPosition() == 0 && stepper3.currentPosition() == 0 && stepper4.currentPosition() == -4800) {
    neutral_type = 1;
  }
  if (neutral_type == 1) {
    stepper1.moveTo(4800);
    stepper2.moveTo(0);
    stepper3.moveTo(0);
    stepper4.moveTo(4800);
    stepper1.run();
    stepper2.run();
    stepper3.run();
    stepper4.run();
  }
  if (neutral_type == 2) {
    stepper1.moveTo(4800);
    stepper2.moveTo(0);
    stepper3.moveTo(0);
    stepper4.moveTo(-4800);
    stepper1.run();
    stepper2.run();
    stepper3.run();
    stepper4.run();
  }
}

void happy() {
  if (stepper1.currentPosition() == 0 && stepper2.currentPosition() == 0 && stepper3.currentPosition() == 4800 && stepper4.currentPosition() == 4800) {
    happy_type = 2;
  }
  if (stepper1.currentPosition() == 0 && stepper2.currentPosition() == 0 && stepper3.currentPosition() == -4800 && stepper4.currentPosition() == -4800) {
    happy_type = 1;
  }
  if (happy_type == 1) {
    stepper1.moveTo(0);
    stepper2.moveTo(0);
    stepper3.moveTo(4800);
    stepper4.moveTo(4800);
    stepper1.run();
    stepper2.run();
    stepper3.run();
    stepper4.run();
  }
  if (happy_type == 2) {
    stepper1.moveTo(0);
    stepper2.moveTo(0);
    stepper3.moveTo(-4800);
    stepper4.moveTo(-4800);
    stepper1.run();
    stepper2.run();
    stepper3.run();
    stepper4.run();
  }
}

void angry() {
  if (stepper1.currentPosition() == -4800 && stepper2.currentPosition() == -1000 && stepper3.currentPosition() == 0 && stepper4.currentPosition() == 4800) {
    angry_type = 2;
  }
  if (stepper1.currentPosition() == -4800 && stepper2.currentPosition() == -1000 && stepper3.currentPosition() == 0 && stepper4.currentPosition() == -4800) {
    angry_type = 1;
  }
  if (angry_type == 1) {
    stepper1.moveTo(-4800);
    stepper2.moveTo(-1000);
    stepper3.moveTo(0);
    stepper4.moveTo(4800);
    stepper1.run();
    stepper2.run();
    stepper3.run();
    stepper4.run();
  }
  if (angry_type == 2) {
    stepper1.moveTo(-4800);
    stepper2.moveTo(-1000);
    stepper3.moveTo(0);
    stepper4.moveTo(-4800);
    stepper1.run();
    stepper2.run();
    stepper3.run();
    stepper4.run();
  }
}

void sad() {
  if (stepper1.currentPosition() == 4800 && stepper2.currentPosition() == 0 && stepper3.currentPosition() == 0 && stepper4.currentPosition() == 0) {
    sad_type = 2;
    Serial.print("Switched");
  }
  if (stepper1.currentPosition() == 4800 && stepper2.currentPosition() == 4800 && stepper3.currentPosition() == 0 && stepper4.currentPosition() == 0) {
    sad_type = 1;
  }
  if (sad_type == 1) {
    Serial.print("Sad type 1");
    stepper1.moveTo(4800);
    stepper2.moveTo(0);
    stepper3.moveTo(0);
    stepper4.moveTo(0);
    stepper1.run();
    stepper2.run();
    stepper3.run();
    stepper4.run();
  }
  if (sad_type == 2) {
    Serial.print("Sad type 2");
    stepper1.moveTo(4800);
    stepper2.moveTo(4800);
    stepper3.moveTo(0);
    stepper4.moveTo(0);
    stepper1.run();
    stepper2.run();
    stepper3.run();
    stepper4.run();
  }
  //Serial.print("sad");
}

void afraid() {
  if (stepper1.currentPosition() == -1000 && stepper2.currentPosition() == -4800 && stepper3.currentPosition() == 4800 && stepper4.currentPosition() == 2000) {
    afraid_type = 2;
  }
  if (stepper1.currentPosition() == -1000 && stepper2.currentPosition() == -5200 && stepper3.currentPosition() == 4800 && stepper4.currentPosition() == 2000) {
    afraid_type = 1;
  }
  if (afraid_type == 1) {
    stepper1.moveTo(-1000);
    stepper2.moveTo(-4800);
    stepper3.moveTo(4800);
    stepper4.moveTo(2000);
    stepper1.run();
    stepper2.run();
    stepper3.run();
    stepper4.run();
  }
  if (afraid_type == 2) {
    stepper1.moveTo(-1000);
    stepper2.moveTo(-5200);
    stepper3.moveTo(4800);
    stepper4.moveTo(2000);
    stepper1.run();
    stepper2.run();
    stepper3.run();
    stepper4.run();
  }
}

void stop() {
  stepper1.moveTo(0);
  stepper2.moveTo(0);
  stepper3.moveTo(0);
  stepper4.moveTo(0);
  stepper1.run();
  stepper2.run();
  stepper3.run();
  stepper4.run();
}

void motor1() { //bottom forward
  stepper1.moveTo(4800);
  stepper1.run();
}
void motor2() { //top back
  stepper2.moveTo(4800);
  stepper2.run();
}
void motor3() {//bottom right
  stepper3.moveTo(4800);
  stepper3.run();
}
void motor4() {//top right
  stepper4.moveTo(4800);
  stepper4.run();
}