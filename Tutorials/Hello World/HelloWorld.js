/*********************************************************************
Copyright 2019 Misty Robotics, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at:

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
implied.
   
See the License for the specific language governing permissions and
limitations under the License.
**********************************************************************/

/**********************************************************************
Moving Misty's Head

This part of Misty's Hello World tutorial teaches how to code
Misty to move her head in a lifelike way.
**********************************************************************/

// Sends a message to debug listeners
misty.Debug("The HelloWorld skill is starting!")

// Returns a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// The look_around timer event invokes this callback function. Change
// the value of repeat to false if Misty should only move her head once.
function _look_around(repeat = true) {

    // Moves Misty's head to a random position. Adjust the min/max
    // values passed into getRandomInt() to change Misty's range of
    // motion when she calls this method.
    misty.MoveHeadDegrees(
        getRandomInt(-40, 20), // Random pitch position between -40 and 20
        getRandomInt(-30, 30), // Random roll position between -30 and 30
        getRandomInt(-40, 40), // Random yaw position between -40 and 40
        85); // Head movement velocity. Can increase up to 100.

        // If repeat is set to true, re-registers for the look_around
        // timer event, and Misty moves her head until the skill ends.
        if (repeat) misty.RegisterTimerEvent(
        "look_around",
        getRandomInt(5, 10) * 1000,
        false);
}

// Registers for a timer event  called look_around, and invokes the
// _look_around() callback after 5000 - 10000 milliseconds.
misty.RegisterTimerEvent("look_around", getRandomInt(5, 10) * 1000, false);

/**********************************************************************
Changing Misty's LED

This part of Misty's Hello World tutorial teaches how to code Misty to
pulse her LED.
**********************************************************************/

// Calls TransitionLED command to pulse Misty's chest LED purple.
// Sets RGB values for starting color to 140, 0, and 220 (purple); sets
// RGB values for finishing color to 0, 0, and 0 (black, or LED off).
// Sets transitionType to "Breathe", and duration to 1000ms (1 second).
// The result is that Misty's chest LED pulses purple once every second
// until the skill ends or is canceled.

misty.TransitionLED(140, 0, 220, 0, 0, 0, "Breathe", 1000);

// Try changing the starting and finishing RGB values, transitionType,
// and duration to achieve different effects!

/**********************************************************************
Playing Sounds

This part of Misty's Hello World tutorial teaches how to write code to
have Misty play a sound
**********************************************************************/

// Plays an audio file at max volume.
misty.PlayAudio("s_Amazement.wav", 100);
// Pauses for 3000 milliseconds before executing the next command.
misty.Pause(3000);

/**********************************************************************
Driving Misty

This part of the Hello World tutorial series teaches how to use one of
Misty's basic driving commands. The code you write here will have Misty
turn slowly to the left and to the right for a better view of her new
home.
**********************************************************************/

misty.DriveTime(0, 30, 5000);
misty.Pause(5000);
misty.DriveTime(0, -30, 5000);
misty.Pause(5000);
misty.Stop();

/**********************************************************************
Teaching Misty to Wave

This part of the Hello World tutorial series teaches how to
programmatically move Misty's arms. The code in this section has Misty
raise her right arm and wave.
**********************************************************************/

// Waves Misty's right arm!
function waveRightArm() {
    misty.MoveArmDegrees("right", -80, 30); // Right arm up to wave
    misty.Pause(3000); // Pause with arm up for 3 seconds
    misty.MoveArmDegrees("both", 80, 30); // Both arms down
}

waveRightArm();

/**********************************************************************
Using Face Recognition

This code has Misty start attempting to detect and recognize faces. If
you've trained Misty on your own face, then Misty waves when she sees
you. If Misty sees a person she doesn't know, she raises her eyebrows
and plays a sound.

If you haven't already trained Misty to recognize your face, use the
Command Center to do so before running the code in this section.
**********************************************************************/

// Invoke this function to start Misty recognizing faces.
function _registerFaceRec() {
    // Cancels any face recognition that's currently underway
    misty.StopFaceRecognition();
    // Starts face recognition
    misty.StartFaceRecognition();
    // If a FaceRecognition event includes a "Label" property,
    // then Misty invokes the _FaceRec callback function.
    misty.AddPropertyTest("FaceRec", "Label", "exists", "", "string");
    // Registers for FaceRecognition events. Sets eventName to FaceRec,
    // debounceMs to 1000, and keepAlive to false.
    misty.RegisterEvent("FaceRec", "FaceRecognition", 1000, false);
}

// FaceRec events invoke this callback function.
function _FaceRec(data) {
    // Stores the value of the label for the detected face
    var faceDetected = data.PropertyTestResults[0].PropertyValue;
    // Logs a debug message with the label of the detected face
    misty.Debug("Misty sees " + faceDetected);

    // Use the Command Center to train Misty to recognize your face.
    // Then, replace <FaceID> below with the label that Misty
    // associates with your own face. If Misty sees and recognizes you,
    // she waves and looks happy.
    if (faceDetected == "<FaceID>") {
        misty.DisplayImage("e_Joy.jpg");
        misty.PlayAudio("s_Joy3.wav");
        waveRightArm();
    }
    // If misty sees someone she doesn't know, she raises her eyebrow
    // and plays a different sound.
    else if (faceDetected == "unknown person") {
        misty.DisplayImage("e_Contempt.jpg");
        misty.PlayAudio("s_DisorientedConfused4.wav");
    };

    // Register for a timer event to invoke the _registerFaceRec
    // callback function loop through the _registerFaceRec() again
    // after 7000 milliseconds pass.
    misty.RegisterTimerEvent("registerFaceRec", 7000, false);
}

// Starts Misty recognizing faces!
_registerFaceRec();