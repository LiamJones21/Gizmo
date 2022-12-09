
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

