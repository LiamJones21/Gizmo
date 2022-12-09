const video = document.getElementById("myvideo");
const handimg = document.getElementById("handimage");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let updateNote = document.getElementById("updatenote");
let but1 = document.getElementById("but1");
let but2 = document.getElementById("but2");
let but3 = document.getElementById("but3");
let but4 = document.getElementById("but4");
let bigbutton = document.getElementById("bigbutton");
let changingtext = document.getElementById("changingtext");

let handsopentext = document.getElementById("Hands Open");
let handsclosedtext = document.getElementById("Hands Closed");
let handspointingtext = document.getElementById("Hands Pointing");
let positiontext = document.getElementById("Position");
let resettext = document.getElementById("Reset");
/* The code above does the following:
1. Gets the video element from the page.
2. Gets the hand image element from the page.
3. Gets the canvas element from the page.
4. Gets the context of the canvas (2D).
5. Gets the update note element from the page.
6. Gets the buttons from the page.
7. Gets the changing text from the page.
8. Gets the texts from the buttons. */
  


let imgindex = 1;
let isVideo = false;
let model = null;
let ip = "192.168.50.33";

let midx = 0;
let midy = 0;
let faceDetected = 0;
let handsDetected = {
  open: 0,
  closed: 0,
  pointing: 0
};

let moodobject = {
  neutral: 0,
  happy: 1,
  angry: 2,
  sad: 3,
  afraid: 4,
  stop: 5
};

let mood = "neutral";
let oldmood = "happy";

let moods = [moodobject[mood],moodobject[mood],moodobject[mood],moodobject[mood],moodobject[mood]];
/* The code above does the following:
1. Sets up the variables that will be used later on.
2. Sets up the different moods.
3. Sets up the moods array which will be used to store the mood values. */




video.width = 200;
video.height = 100;

const modelParams = {
  flipHorizontal: true, // flip e.g for video
  maxNumBoxes: 20, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.6, // confidence threshold for predictions.
};


//set textbox with id of ipaddress to the ip variable
// document.getElementById("ipaddress").value = ip;

function startVideo() {
  handTrack.startVideo(video).then(function (status) {
    console.log("video started", status);
    if (status) {
      
      changingtext.innerText = "Now tracking";
      isVideo = true;
      runDetection();
    } else {
      changingtext.innerText = "Please enable video";
    }
    console.log("isVideo", isVideo);
  });
}

function toggleVideo() {
  if (!isVideo) {
    changingtext.innerText = "Starting video";
    startVideo();
  } else {
    changingtext.innerText = "Stopping video";
    handTrack.stopVideo(video);
    isVideo = false;
    changingtext.innerText = "Video stopped";
  }
}

//if reset button is clicked, if text is reset set mood to neutral, set text to position, if text is continue, set text to reset and set mood to oldmood
resettext.addEventListener("click", function () {
  if (resettext.innerText == "Reset") {
    mood = "stop";
    handTrack.stopVideo(video);
    gamex = 0;
    gamey = 0;
    midx = 0;
    midy = 0;
    changingtext.innerText = mood;
    moods = [moodobject[mood],moodobject[mood],moodobject[mood],moodobject[mood],moodobject[mood]]
    isVideo = false;
    positiontext.innerText = "x: " + Math.round(midx) + " y: " + Math.round(-midy);

    resettext.innerText = "Position";
    sendjustMood(mood);
  } else {
    startVideo();
    resettext.innerText = "Reset";
    mood = oldmood;
  }
});


// when but2li is clicked, run the toggleVideo function
bigbutton.addEventListener("click", function () {
  console.log("but2 clicked");
  console.log("isVideo", isVideo);
  toggleVideo();
  console.log("isVideo", isVideo);
});

//for each button, when clicked, use the id of the button to set the mood variable and send it using sendjustMood(mood)
but1.addEventListener("click", function () {
  mood = "happy";
  sendjustMood(mood);
});
but2.addEventListener("click", function () {
  mood = "afraid";
  sendjustMood(mood);
});
but3.addEventListener("click", function () {
  mood = "angry";
  sendjustMood(mood);
});
but4.addEventListener("click", function () {
  mood = "sad";
  sendjustMood(mood);
});



//when click on screen consolelog the id of the element clicked
document.addEventListener("click", function (e) {
  console.log(e.target.id);
});
/* The code above does the following:
1. When the button is clicked, it calls the function toggleVideo
2. The toggleVideo function calls startVideo if isVideo is false, and stopVideo if isVideo is true
3. The startVideo function calls handTrack.startVideo(video) which is a function that is part of the handtrack.js library. This function starts the video and returns a status. If the status is true, the function then calls runDetection. The startVideo function also sets isVideo to true.
4. The stopVideo function calls handTrack.stopVideo(video) which is a function that is part of the handtrack.js library. This function stops the video. The stopVideo function also sets isVideo to false.
5. The runDetection function is a recursive function. It calls handTrack.detect(video). This function is part of the handtrack.js library. It does the hand detection and returns a list of predictions. Each prediction has a bbox, which is the bounding box of the hand. The runDetection function then calls drawRect to draw the bounding box on the canvas. It also calls drawPoint to draw circles on the canvas. The runDetection function then calls itself every 100 milliseconds.
6. When the runDetection function calls itself, it calls handTrack.detect(video) again. This returns a new list of predictions. The runDetection function then compares the bounding box of the first prediction in the new list with the bounding box of the first prediction in the old list. It then calculates the difference in the x and y position of the bounding box. The difference is the amount that the hand has moved since the last time the runDetection function was called. It then adds the difference in the x and y position to the position of the hand on the canvas. The runDetection function then calls drawRect to draw the new bounding box on the canvas. It also calls drawPoint to draw circles on the canvas. The runDetection function then calls itself every 100 milliseconds.
7. The drawRect function draws a rectangle on the canvas.
8. The drawPoint function draws a circle on the canvas. */

function nextImage() {
  imgindex++;
  handimg.src = "http://192.168.4.1/jpg";
  // alert(handimg.src)
  setTimeout(() => {
    runDetectionImage(handimg);
  }, 500);
}
/* The code above does the following:
1. Loads the next image from the camera
2. Calls the runDetectionImage function */

//create function to calculate the midpoints of the bounding box
function midpointBoundingBox(prediction) {
  if (prediction.label !== "face"){return}
  if (faceDetected !== 0){return}

  faceDetected = 1;
  // get mid point of x values of bounding box
  midx = prediction.bbox[0] + (prediction.bbox[2] / 2) - video.width/2
  // gamex = document.body.clientWidth * (midx / video.width)
  gamex = (midx / video.width);

  // gamey = document.body.clientHeight * (prediction.bbox[1] / video.height)

  // get mid point of y values of bounding box
  midy = prediction.bbox[1] + (prediction.bbox[3] / 2)- video.height/2
  gamey = (midy / video.height) 
  console.log("midx: " + midx + " midy: " + midy);

}
/* The code above does the following:
1. We calculate the midpoint of the bounding box by adding the x and y values of the box, and dividing by 2. We then subtract the width and height of the video to center the coordinates relative to the video.
2. We then use the calculated midpoint values to determine the x and y coordinates of the game character.
3. We then print the x and y coordinates to the console. */

//reset handsDetected
function resetHandsDetected() {
  handsDetected = {
    open: 0,
    closed: 0,
    pointing: 0
  };
}
/* The code above does the following:
1. Defines a variable called handsDetected.
2. Initializes the variable to an object with three properties (open, closed, and pointing).
3. Initializes the property values to 0 (zero). */

//iterate through predictions and count the number of hands detected
function countHandsTypeDetected(predictions) {
  predictions.forEach(prediction => {
    if (prediction.label === "open") {
      handsDetected.open++;
    } else if (prediction.label === "closed") {
      handsDetected.closed++;
    } else if (prediction.label === "point") {
      handsDetected.pointing++;
    }
  });
}
/* The code above does the following:
1. Create a new variable handsDetected with the following properties: open, closed, and pointing.
2. Set the value of each property to 0.
3. Create a function called countHandsTypeDetected and pass it the predictions parameter.
4. Use the forEach method on the predictions array to iterate through each prediction in the array.
5. Within the forEach method, create an if statement that checks whether the label property of each prediction is equal to "open".
6. If the condition is true, increment the value of the open property of the handsDetected variable by 1.
7. Repeat steps 5 and 6 for the closed and pointing labels. */


//create function to set the mood of the arm based on the hands detected
function setMood() {
  //set cases for mood
  
  //if more than 2 hands are open set mood to neutral
  if (handsDetected.open >= 2) {
    mood = "neutral";
  }
  //if only 1 hand is open set mood to happy
  else if (handsDetected.open === 1) {
    mood = "happy";
  }
  //if there is a pointing hand set mood to angry
  else if (handsDetected.pointing > 0) {
    mood = "angry";
  }
  
  
  
  //if there is only 1 hand closed set mood to sad
  else if (handsDetected.closed === 1) {
    mood = "sad";
  }
  //if more than 2 hands are closed set mood to affraid
  else if (handsDetected.closed >= 2) {
    mood = "afraid";
  }
  //output the all values of hands detected
  console.log("open: " + handsDetected.open + " closed: " + handsDetected.closed + " pointing: " + handsDetected.pointing + " mood: " + mood);

}
/* The code above does the following:
1. It creates a function called setMood. The function is called whenever a hand is detected.
2. The function sets the mood based on the number of hands detected.
3. It also outputs the number of hands detected for each type of hand gesture. The number of hands detected is stored in the handsDetected object. The handsDetected object is created in the code below. */





function runDetection() {
  model.detect(video).then((predictions) => {
    // console.log("Predictions: ", predictions);
    model.renderPredictions(predictions, canvas, context, video);
    //run analysis on predictions
    if (predictions.length > 0) {

      predictions.forEach((prediction) => {
        
        if (prediction.class === 1) {
          // console.log("hand detected");
        }
        //calculate midpoints of bounding box
        midpointBoundingBox(prediction);
        
      });
    }

    /* The code above does the following:
    1. Checks if the prediction array is empty
    2. If it is not empty, it loops through the array and checks if the class value is 1 (hand detected)
    3. If it is, the midpoint of the bounding box is calculated */


    //iterate through predictions and count the number/type of hands detected
    countHandsTypeDetected(predictions);
    //if mood is stop return
    if (mood === "stop") {
      faceDetected = 0;
    resetHandsDetected();
    if (isVideo) {
      requestAnimationFrame(runDetection);
    }
      return;
    }
    //set the mood of the arm based on the hands detected
    setMood();
    // hangingtext.innerText = mood;
    //if mood has changed, hangingtext.innerText = mood;
    //if mood is null or undefined, set mood to neutral
    if (mood === null || mood === undefined) {
      mood = "neutral";
    }
    if (mood !== oldmood) {
      changingtext.innerText = mood;
      oldmood = mood;
    }
    //set hands open text to number of hands open and hands closed text to number of hands closed and hands pointing text to number of hands pointing if they are valid numbers
    if (handsDetected.open > 0) {
      handsopentext.innerText = "Hands Open: " + handsDetected.open;
    } else {
      handsopentext.innerText = "0";
    }
    if (handsDetected.closed > 0) {
      handsclosedtext.innerText = "Hands Closed: " + handsDetected.closed;
    } else {
      handsclosedtext.innerText = "0";
    }
    if (handsDetected.pointing > 0) {
      handspointingtext.innerText = "Hands Pointing: " + handsDetected.pointing;
    } else {
      handspointingtext.innerText = "0";
    }
    /* The code above does the following:
    1. It checks for the number of hands in the scene
    2. If the number of hands is greater than 0, it will display the number of hands detected in the UI
    3. If the number of hands is 0, it will display 0 in the UI */
 
    //create a loop if mood is happy set the class of but1 to active else remove active class repeat for all buttons
    if (mood === "happy") {
      but1.classList.add("active");
    } else {
      but1.classList.remove("active");
    }
    if (mood === "sad") {
      but2.classList.add("active");
    } else {
      but2.classList.remove("active");
    }
    if (mood === "angry") {
      but3.classList.add("active");
    } else {
      but3.classList.remove("active");
    }
    if (mood === "afraid") {
      but4.classList.add("active");
    } else {
      but4.classList.remove("active");
    }
    
    //if x and y values are not null or undefined set the 0
    // if (!gamex ||!gamey) {
    //   gamex = 0;
    //   gamey = 0;
    // }


    // //set positiontext to the x and y values of the hand
    positiontext.innerText = "x: " + Math.round(midx) + " y: " + Math.round(-midy);

    

    //resets
    faceDetected = 0;
    resetHandsDetected();
    if (isVideo) {
      requestAnimationFrame(runDetection);
    }
    
    /* The code above does the following:
    1. Checks if the face has been detected.
    2. If face is detected, then it will reset the hands detected.
    3. If it is a video, then it will run the detection

    The code below is the detection code. It is where the code for face, hand, and pose detection is run. */

  });
}
/* The code above does the following:
1. Sets the mood of the arm based on the hands detected
2. Displays the number of hands open, closed, and pointing
3. Displays the x and y position of the hand
4. Displays the mood of the arm in a text box
5. Displays the mood of the arm in a text box that changes with the mood
6. Sets the mood of the buttons based on the mood of the arm
7. Sets the position of the arm based on the position of the hand
8. Stops the arm from moving if there is no user detected
9. Resets the number of hands detected each frame
10. Runs the code in a loop */





function runDetectionImage(img) {
  model.detect(img).then((predictions) => {
    // console.log("Predictions: ", predictions);
    model.renderPredictions(predictions, canvas, context, img);
  });
}
/* The code above does the following:
1. Loads the model
2. Loads the image
3. Detects objects inside the image
4. Draws boxes around the objects
5. Writes the name of the objects inside the boxes */





// Load the model.
handTrack.load(modelParams).then((lmodel) => {
  // detect objects in the image.
  model = lmodel;
  console.log(model);
  changingtext.innerText = "Loaded Model!";
  //wait 1 second then chnage text to please enable camera
  setTimeout(() => {
    if (!isVideo) {
    changingtext.innerText = "Starting video";
    startVideo();
  } else {
    changingtext.innerText = "Stopping video";
    handTrack.stopVideo(video);
    isVideo = false;
    changingtext.innerText = "Video stopped";
  };
  }, 1000);
  runDetectionImage(handimg);
  // trackButton.disabled = false;
  // nextImageButton.disabled = false;
});
// every 1000ms run send mood x and y to server
setInterval(() => {
  sendMood();
}, 2000);

/* The code above does the following:
1. Load the model.
2. Detect objects in the image.
3. Start the webcam.
4. If the webcam is active, start detecting objects in real time. */






// create a function to send the mood and x and y to the server
function sendMood() {
  //if mood is undefined set it to neutral
  if (mood === undefined) {
    mood = "neutral";
  };

  //if gamex is undefined set it to 0
  if (!gamex) {
    gamex = 0;
  }
  //if gamey is undefined set it to 0
  if (!gamey) {
    gamey = 0;
  }
  
  //add mood to moods array
  moods.push(moodobject[mood])
  //if moods array is longer than 10 remove the first element
  if (moods.length > 5) {
    moods.shift();
  }

  /* The code above does the following:
  1. Pushes the mood to the moods array
  2. Checks if the moods array is longer than 10
  3. If the moods array is longer than 10 remove the first element (the oldest mood) */

  let movingAverage = moods.reduce((a, b) => a + b, 0) / moods.length;
  //round moving average to integer and set it to the variable smoothmood
  smoothmood = Math.round(movingAverage)
  /* The code above does the following:
    1. It takes the array of values in the moods array
    2. It reduces the array of values to a single value by adding the values in the array
    3. It divides the sum of the values in the array by the number of values in the array
    4. It rounds the result to the nearest integer and sets that value to the variable smoothmood */



  fetch("http://"+ip+"/update?state=" + smoothmood + "&x-axis=0&y-axis=0")
    .then(response => response.json())
    .then(data => console.log(data));
  console.log("http://"+ip+"/update?state="+ smoothmood + "&x-axis=0&y-axis=0")
}
/* The code above does the following:
1. It checks if the mood is undefined, if it is then the mood is set to neutral
2. It checks if the x and y values are undefined, if they are then they are set to 0
3. It adds the mood to the moods array
4. If the moods array is longer than 10 then the first element is removed
5. It adds all the values in the moods array and divides by the length, this gives the moving average
6. It rounds the moving average to the nearest integer and sets it to the variable smoothmood
7. It sends the smoothmood and the x and y values to the server
8. It prints the url that is being sent to the console */






// create a function to detect if no hands are detected for 5 seconds set mood to neutral
setInterval(() => {
  //if mood is stop return 
  if (mood === "stop") {
    return;
  }

  if (handsDetected.open === 0 && handsDetected.closed === 0 && handsDetected.pointing === 0) {
    mood = "neutral";
  }
}, 2000);

/* The code above does the following:
1. Creates a function that runs every 2 seconds
2. Checks to see if the mood is set to stop. If it is, the function returns.
3. If the mood is not set to stop, the function checks to see if any hands are detected. If no hands are detected, the mood is set to neutral. */





//when text box with id ipAddress is updated set the updated ip to the variable ip
ipAddress.addEventListener("input", function () {
  ip = ipAddress.value;
  console.log(ip);
}
);
//set default value of ip text box with id ipAddress to the variable ip
ipAddress.value = ip;
/* The code above does the following:
1. Sets the value of the text box with id ipAddress to the variable ip.
2. Adds an event listener to the text box with id ipAddress which changes the value of the variable ip to the value of the text box with id ipAddress.
3. Logs the value of the variable ip to the console. */






//create a function to send data to "http://"+ip+"/update?state="+ mood + "&x-axis=0&y-axis=0" where mood is the input to the function
function sendjustMood(mood) {
  fetch("http://"+ip+"/update?state="+ moodobject[mood] + "&x-axis=0&y-axis=0")
    .then(response => response.json())
    .then(data => console.log(data));
  console.log("http://"+ip+"/update?state="+ moodobject[mood] + "&x-axis=0&y-axis=0")
}
/* The code above does the following:
1. It creates a function called sendjustMood which takes a parameter called mood
2. It then sends a HTTP request to the server using the fetch API
3. It takes the input mood and converts it to the corresponding value in the moodobject
4. It then sends the mood to the server using the URL
5. It then prints the URL to the console */