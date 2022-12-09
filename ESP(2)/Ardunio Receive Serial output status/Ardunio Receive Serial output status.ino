#include <ArduinoJson.h>
#include <FastLED.h>

#define LED_PIN 3
#define NUM_LEDS 21
#define BRIGHTNESS 64
#define LED_TYPE WS2811
#define COLOR_ORDER GRB
CRGB leds[NUM_LEDS];

#define UPDATES_PER_SECOND 100

int currentAnimation = 0;



CRGBPalette16 currentPalette;
TBlendType currentBlending;

extern CRGBPalette16 myRedWhiteBluePalette;
extern const TProgmemPalette16 myRedWhiteBluePalette_p PROGMEM;

uint8_t brightness = 255;


void setup() {
  // Start serial communication
  Serial.begin(115200);

  // Set pin 13 as an output
  pinMode(13, OUTPUT);
  delay(3000);  // power-up safety delay
  FastLED.addLeds<LED_TYPE, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS).setCorrection(TypicalLEDStrip);
  FastLED.setBrightness(BRIGHTNESS);

  currentPalette = RainbowColors_p;
  currentBlending = LINEARBLEND;
}

void loop() {
  // Check if there is serial input available
  if (Serial.available() > 0) {
    // Read the serial input
    String input = Serial.readString();
    Serial.print(input);
    // Convert the input to a JSON object
    StaticJsonDocument<200> jsonDoc;
    DeserializationError error = deserializeJson(jsonDoc, input);

    // Check if the input is valid JSON
    if (!error) {
      // Get the values from the JSON object
      //{"state":5,"x-axis":0,"y-axis":0}
      int status = jsonDoc["state"];
      float x = jsonDoc["x-axis"];
      float y = jsonDoc["y-axis"];
      Serial.println(x);
      Serial.println(y);
      Serial.println(status);
    }
    // Check which function to call based on the status
  }
// FastLED provides several 'preset' palettes: RainbowColors_p, RainbowStripeColors_p,
// OceanColors_p, CloudColors_p, LavaColors_p, ForestColors_p, and PartyColors_p.

  static uint8_t startIndex = 0;
  startIndex = startIndex + 1; /* motion speed */
  uint8_t secondHand = (millis() / 1000) % 60;
  static uint8_t lastSecond = 99;
  switch (currentAnimation) {
    case 0:
      SetupBlackAndWhiteStripedPalette();
      brightness = 255;
      // currentPalette = CloudColors_p;
      break;
    case 1:
      currentPalette = PartyColors_p;
      brightness = 255;
      break;
    case 2 :
      SetupBlackAndRedStripedPalette();
      brightness = 255;
    break;
    case 3:
      currentPalette = OceanColors_p;
      brightness = 100;
      break;
    case 4 :
      currentPalette = OceanColors_p;;
      brightness = 100;
      break;
    case 5 :
      currentPalette = OceanColors_p;;
      brightness = 0;
    break;
      
  }
  currentBlending = LINEARBLEND;
  // if( lastSecond != secondHand) {
  //       lastSecond = secondHand;
  //       // switch (currentAnimation) {
  //       //   case 0:
  //       //     neutral();
  //       //     break;
  //       //   case 1:
  //       //     function2();
  //       //     break;
  //       // }
  //     if( secondHand ==  0)  {
  //        }
  //       // if( secondHand == 10)  { currentPalette = RainbowStripeColors_p;   currentBlending = NOBLEND;  }
  //       // if( secondHand == 15)  { currentPalette = RainbowStripeColors_p;   currentBlending = LINEARBLEND; }
  //       // if( secondHand == 20)  { SetupPurpleAndGreenPalette();             currentBlending = LINEARBLEND; }
  //       // if( secondHand == 25)  { SetupTotallyRandomPalette();              currentBlending = LINEARBLEND; }
  //       // if( secondHand == 30)  { SetupBlackAndWhiteStripedPalette();       currentBlending = NOBLEND; }
  //       // if( secondHand == 35)  { SetupBlackAndWhiteStripedPalette();       currentBlending = LINEARBLEND; }
  //       // if( secondHand == 40)  { currentPalette = CloudColors_p;           currentBlending = LINEARBLEND; }
  //       // if( secondHand == 45)  { currentPalette = PartyColors_p;           currentBlending = LINEARBLEND; }
  //       // if( secondHand == 50)  { currentPalette = myRedWhiteBluePalette_p; currentBlending = NOBLEND;  }
  //       // if( secondHand == 55)  { currentPalette = myRedWhiteBluePalette_p; currentBlending = LINEARBLEND; }
  // }
  FillLEDsFromPaletteColors(startIndex);

  FastLED.show();
  FastLED.delay(1000 / UPDATES_PER_SECOND);
}





void FillLEDsFromPaletteColors(uint8_t colorIndex) {
  // uint8_t brightness = 255;

  for (int i = 0; i < NUM_LEDS; ++i) {
    leds[i] = ColorFromPalette(currentPalette, colorIndex, brightness, currentBlending);
    colorIndex += 3;
  }
}
void SetupBlackAndWhiteStripedPalette()
{
    // 'black out' all 16 palette entries...
    fill_solid( currentPalette, 16, CRGB::Black);
    // and set every fourth one to white.
    currentPalette[0] = CRGB::White;
    currentPalette[4] = CRGB::White;
    currentPalette[8] = CRGB::White;
    currentPalette[12] = CRGB::White;
    
}

void SetupBlackAndRedStripedPalette()
{
    // 'black out' all 16 palette entries...
    fill_solid( currentPalette, 16, CRGB::Black);
    // and set every fourth one to white.
    currentPalette[0] = CRGB::Red;
    currentPalette[4] = CRGB::Orange;
    currentPalette[8] = CRGB::Red;
    currentPalette[10] = CRGB::Orange;
    currentPalette[12] = CRGB::White;
    
}
void sadColours()
{
    // 'black out' all 16 palette entries...
    fill_solid( currentPalette, 16, CRGB::Black);
    // and set every fourth one to white.
    currentPalette[0] = CHSV( 176,224,230);
    currentPalette[4] = CRGB::Orange;
    currentPalette[8] = CRGB::Red;
    currentPalette[10] = CRGB::Orange;
    currentPalette[12] = CRGB::White;
    
}

void neutral() {
  // // Do something here using the x and y values
  // Serial.print("neutral 1 ran");
  // for (int i = 0; i < 16; ++i) {
  //   currentPalette[i] = CHSV(random8(), 255, random8());
  // }
  // delay(10000);
}

void function2() {
  // Do something here using the x and y values
  Serial.print('function 2 ran');
}

void function3(int x, int y) {
  // Do something here using the x and y values
  Serial.print('function 3 ran');
}
