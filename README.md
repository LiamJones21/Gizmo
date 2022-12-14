

# Emma: A WebApp for Controlling a Mechanical Tentacle
Emma uses a JavaScript-based WebApp that allows users to control a mechanical tentacle called Emma. The tentacle is made up of two segments, each of which is controlled by two motors, giving the tentacle a total of four degrees of freedom.

The code for Emma uses an API to receive a video input from a local network, which is then processed and post-processed using handtrack.js, a machine learning library for detecting hand gestures in video. The processed video is used to generate a JSON document containing values for the tentacle's mood and status, based on the user's hand gestures and the location of their face relative to the arm.

These values are then sent back over the network to an ESP, which deserializes the data and processes it, sending the resulting data over serial to two individual Arduinos. The first Arduino uses fastled to control the lights on the tentacle, depending on its emotional state, while the second Arduino uses multistepper and accelstepper to control the tentacle's four motors with acceleration and asynchronous behavior. This allows the tentacle to be interrupted at any time, allowing for precise and responsive control.

## adjusting the tenticle

In addition to its core functionality, Emma also offers a number of advanced features. For example, the WebApp includes an interface for manually adjusting the tentacle's movement, allowing users to fine-tune its behavior. This can be useful for tasks such as calibrating the tentacle's position or adjusting its speed and acceleration.
Another useful feature of Emma is its ability to track and respond to multiple users simultaneously. This allows multiple people to control the tentacle at the same time, either independently or in collaboration. This can create a fun and engaging group experience, and can also be useful for tasks such as manipulating objects or performing complex movements.


Finally, Emma's use of machine learning and AI technologies allows it to continually improve its performance over time. As the WebApp processes more video data, it can learn to more accurately detect hand gestures and facial expressions, resulting in more responsive and intuitive control of the tentacle.
Overall, Emma is a powerful and sophisticated tool for controlling a mechanical tentacle, offering users a unique and engaging experience. Whether you're using it for fun, experimentation, or practical applications, Emma is sure to impress.

## The Back End of the tenticle

In addition to its user-facing features, Emma also includes a powerful backend that powers its machine learning capabilities. This backend uses a range of technologies and algorithms to accurately interpret the video data received from the API and generate the JSON documents containing the tentacle's mood and status.
For example, Emma uses deep learning neural networks to analyze the video data and detect hand gestures and facial expressions. These neural networks have been trained on large datasets of images and videos, allowing them to accurately recognize a wide range of hand gestures and facial expressions.
The JSON documents generated by Emma's backend are then sent over the network to the ESP, which processes the data and sends it to the Arduinos controlling the tentacle. The Arduinos use this data to determine the appropriate movements and behaviors for the tentacle, resulting in responsive and intuitive control.
Overall, Emma's backend is a crucial component of the WebApp, allowing it to deliver its powerful machine learning capabilities to users. With its sophisticated algorithms and technologies, Emma's backend is able to provide users with a truly unique and engaging experience.

# Getting Started

- To get started with Emma, you'll need to set up the necessary hardware and software. This includes the mechanical tentacle itself, along with the necessary Arduinos, motors, and other hardware components. You'll also need to install the WebApp on a computer or other device that's connected to the same local network as the tentacle.
- Once everything is set up, you can start using Emma by launching the WebApp and following the on-screen instructions. This will typically involve pointing your device's camera at the tentacle and using your hands to control its movement. The WebApp will use machine learning to interpret your hand gestures and facial expressions, and will translate these into movements for the tentacle.
- As you use Emma, you may want to adjust its settings or tweak its behavior. This can be done through the WebApp's interface, which offers a range of options for customizing the tentacle's movements and other behaviors. For example, you can adjust the tentacle's speed, acceleration, and other parameters to suit your preferences or the specific task at hand.


## How to use the webapp
### Setting up

<img width="1431" alt="image" src="https://user-images.githubusercontent.com/92636294/206808662-05b6b3ef-efd1-48b0-8f36-56ca57a81e74.png">

<img width="1217" alt="image" src="https://user-images.githubusercontent.com/92636294/206807854-56e47ee8-4264-4079-a11c-403b0acd2101.png">


### GUI Meanings
<img width="1280" alt="image" src="https://user-images.githubusercontent.com/92636294/206808146-78895b1b-c9ee-459a-8864-65bc11f05ccd.png">

### Buttons
<img width="520" alt="image" src="https://user-images.githubusercontent.com/92636294/206808250-4ac8ef7a-08c3-4374-86b6-45a4f0ef6ee0.png">

### Console Logs
<img width="1194" alt="image" src="https://user-images.githubusercontent.com/92636294/206808483-a38a244e-d0c6-4968-b06e-9a863c329e39.png">

<img width="1864" alt="image" src="https://user-images.githubusercontent.com/92636294/206807668-fd33dd0f-c7ba-47db-9c8d-ac70a3a97554.png">


# Complex Outcome
- The control of the motors using the AccelStepper and MultiStepper libraries. These libraries provide a high degree of control over the motors, but they can be challenging to use and require careful coding to ensure that the movements of the arm are smooth and accurate.

    ### Why we chose it

    - Asynchronous functions allow the program to continue executing while waiting for serial input to be received. This means that the program does not need to block or pause, which can prevent the motors from stopping.
    - Asynchronous functions provide a way to handle serial input as it is received, rather than waiting for all of the input to be received before processing it. This allows the program to respond to serial input more quickly, which can prevent the motors from stopping.
    - Asynchronous functions provide a way to handle multiple pieces of serial input concurrently, rather than processing them one at a time. This can improve the performance and responsiveness of the program, and can prevent the motors from stopping.

     ### Why its hard
     
    - Asynchronous functions are executed independently of the main program flow, which can make it difficult to predict and control their behavior. This can lead to unexpected results and can make debugging difficult.
    - Asynchronous functions are often used to perform tasks that take a long time to complete, such as network requests or complex computations. This can lead to delays and slowdowns in the overall performance of the program.
    - Asynchronous functions can cause race conditions, where multiple asynchronous operations are executed simultaneously and compete for shared resources, such as memory or CPU time. This can lead to unpredictable behavior and can be difficult to diagnose and fix.
    - Asynchronous functions can be difficult to test and debug, as they can be hard to reproduce and may not always behave the same way in different environments.

- The hand and face tracking using handtrack.js and face detection algorithms. These algorithms are complex and require significant computational power to run in real-time. Additionally, the algorithms may need to be fine-tuned and adjusted to work well with the specific hardware and setup of the Emma Tentacle.

    ### Why we chose it


    - AI and machine learning algorithms are able to analyze and interpret visual data quickly and accurately, which is essential for tracking and identifying the user's hand gestures and facial expressions.
    - AI and machine learning algorithms are able to learn and adapt to the user's behavior over time, which can improve the accuracy and reliability of the tracking and identification process.
    - AI and machine learning algorithms are able to handle complex, real-world scenarios, such as variations in lighting and background, which can make the tracking and identification process more robust and reliable.
    - AI and machine learning algorithms are able to process large amounts of data in real-time, which is essential for providing a smooth and responsive user experience.

    ### Why its hard

    - AI and machine learning algorithms are complex and require a deep understanding of these technologies to implement and optimize. This can require significant expertise and experience in AI and machine learning.
    - AI and machine learning algorithms require large amounts of data to train and optimize, which can be difficult to obtain and manage. This can require significant effort and resources to collect and prepare the data.
    - AI and machine learning algorithms require significant computational power to run in real-time, which can be challenging to provide, especially in embedded systems like the Emma Tentacle robot. This can require careful design and optimization of the hardware and software.
    - AI and machine learning algorithms are subject to bias and other errors, which can impact the accuracy and reliability of the tracking and identification process. This can require careful analysis and testing to identify and mitigate these issues.

- The integration of the various components of the system, including the web app, the ESP, and the Arduino boards. This requires careful planning and coordination to ensure that the different components are able to communicate and interact with each other effectively.

    ### Why we chose it

    - The use of multiple Arduino boards allows for the separation of different tasks and functions, such as controlling the motors and the lights. This can improve the performance and reliability of the system, as different tasks can be handled by different boards, and failure or malfunction of one board will not affect the others.
    - The use of an ESP32 allows for the integration of Wi-Fi and networking capabilities, which are essential for the remote control and monitoring of the Emma Tentacle. The ESP32 also has a more powerful processor and more memory than most Arduino boards, which can improve the performance and reliability of the system.
    - The use of multiple boards and the ESP32 allows for the distribution of the computational workload, which can improve the performance and reliability of the system. Different boards and the ESP32 can handle different tasks and processes simultaneously, which can reduce the likelihood of bottlenecks and other performance issues.
    - The use of multiple boards and the ESP32 allows for the use of specialized libraries and other tools that can improve the performance and reliability of the system. For example, the AccelStepper and MultiStepper libraries can be used to control the motors more accurately and smoothly, and the FastLED library can be used to control the lights more effectively.

- creating a hosted webapp
    ### Why we chose it
    - A web app allows for remote control and monitoring of the Emma Tentacle from any device with a web browser, such as a laptop, tablet, or smartphone. This allows users to control and monitor the robot from anywhere, without needing to be physically near the robot.
    - A web app allows for easy and intuitive control of the robot using a graphical user interface (GUI). The GUI can provide visual feedback and other information to the user, which can make it easier to understand and control the robot.
    - A web app allows for easy integration of advanced features and capabilities, such as machine learning and AI-based tracking and identification, without needing to modify the hardware or firmware of the robot. This allows users to easily add and customize new features and capabilities as needed.
    - A web app allows for easy collaboration and sharing of the robot's capabilities and features with other users. Users can share the web app and its features with others, who can then access and use the robot remotely.

    However, creating a web app to do the processing on the Emma Tentacle can also be challenging for several reasons:

    - Web apps require a web server and a network connection to operate, which can be complex and difficult to set up and maintain. This can require significant expertise and experience in web development and networking.
    - Web apps can be vulnerable to security and privacy issues, such as hacking and data breaches. This can require careful design and implementation of security measures to protect the web app and the data it processes.
    - Web apps can be difficult to optimize for performance and reliability, especially when running on low-power devices such as the ESP32. This can require careful design and optimization of the web app and its underlying infrastructure to ensure smooth and reliable operation.

    Overall, creating a web app to do the processing on the Emma Tentacle can provide many benefits, but it can also be challenging due to the complexity and requirements of web development and networking, as well as the need for security and performance optimization.
    
    
    
    
    # Sources
    ## Libaries
     - ESP
     - Adafruit
     - Wifi.h
     - MultiStepper
     - AccellStepper
     - OPENAI
     - Github Coppilot
     - Handtrack.js
    
    ## Example code
    - Fourier.space webserver 
