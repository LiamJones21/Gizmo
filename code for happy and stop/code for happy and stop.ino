#include <AccelStepper.h>
#include <MultiStepper.h>
#define enable 8
// Define the stepper motor and the pins that is connected to
AccelStepper stepper1(1, 2, 5); // (Typeof driver: with 2 pins, STEP, DIR)
AccelStepper stepper2(1, 3, 6);
AccelStepper stepper3(1, 4, 7);
AccelStepper stepper4(1, 5, 8);

String current_animation = "stop";
String moving = "left";
int data = 1;


MultiStepper steppersControl;  // Create instance of MultiStepper

long gotoposition[4]; // An array to store the target positions for each stepper motor

void setup() {
  Serial.begin(115200);
  pinMode(enable, OUTPUT);
  digitalWrite(enable, LOW);
  stepper1.setMaxSpeed(4000); // Set maximum speed value for the stepper
  stepper2.setMaxSpeed(4000);
  stepper3.setMaxSpeed(4000);
  stepper4.setMaxSpeed(4000);

  // Adding the 3 steppers to the steppersControl instance for multi stepper control
  steppersControl.addStepper(stepper1);
  steppersControl.addStepper(stepper2);
  steppersControl.addStepper(stepper3);
  steppersControl.addStepper(stepper4);
}

void happy() {
  // Store the target positions in the "gotopostion" array
  if  (steppersControl[0].currentPosition() == 4800) {
    moving = "left"
  }
  if  (steppersControl[0].currentPosition() == -4800) {
    moving = "right"
  }
  if (moving == "right") {
    gotoposition[0] = 4800;  // 800 steps - full rotation with quater-step resolution
    gotoposition[1] = 4800;
    gotoposition[2] = 0;
    gotoposition[3] = 0;
    steppersControl.setTargetPosition(gotoposition); // Calculates the required speed for all motors
  }
  if (moving == "right") {
    gotoposition[0] = -4800;  // 800 steps - full rotation with quater-step resolution
    gotoposition[1] = -4800;
    gotoposition[2] = 0;
    gotoposition[3] = 0;
    steppersControl.setTargetPosition(gotoposition); // Calculates the required speed for all motors
    ststatus
  }
  delay(1000);
}


void stop_motors() {
  Serial.print("running stop");
  gotoposition[0] = 0;  // 800 steps - full rotation with quater-step resolution
  gotoposition[1] = 0;
  gotoposition[2] = 0;
  gotoposition[3] = 0;

  steppersControl.setTargetPosition(gotoposition); // Calculates the required speed for all motors
  steppersControl.runSpeedToPosition(); // Blocks until all steppers are in position

  delay(1000);
}

void serialEvent()
{
  // read string from serial port
  data = Serial.readString().toInt();
  Serial.print(data);

}

void loop() {
  

}