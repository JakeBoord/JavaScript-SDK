/**********************************************************************
Copyright 2019 Misty Robotics, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
imitations under the License.
**********************************************************************/

/**********************************************************************
wakeWord

This sample shows how to code Misty to respond when she hears the "Hey,
Misty!" key phrase.

When you call the misty.StartKeyPhraseRecognition() command, Misty
listens for the key phrase by continuously sampling audio from the
environment and comparing that audio to her trained key phrase model
(in this case, "Hey, Misty!"). Misty does not create or save audio
recordings while listening for the key phrase.

You must start key phrase recognition before Misty can send
KeyPhraseRecognized event messages. We follow these steps to code Misty
to respond to the "Hey, Misty!" key phrase:

1. Issue a misty.StartKeyPhraseRecognition() command.
2. Register for KeyPhraseRecognized events. When Misty hears the key
phrase, she sends a message to KeyPhraseRecognized event listeners.
Note that Misty stops listening for the key phrase each time she hears
the wake word, and you'd need to issue another command to start key
phrase recognition to start her listening again.
3. Write the code to handle what Misty should do when she hears the key
phrase inside the event callback. For example, you might have Misty
turn to face you or start recording audio to hand off to a
third-party service for additional processing.

We've left a lot of comments in this code for developers new to the
Misty platform. If you already know your way around, feel free to
ignore them!
**********************************************************************/

detectWakeWord();

// Sets up wake word detection
function detectWakeWord() {
   misty.Debug("Starting key phrase recognition...");
   misty.StartKeyPhraseRecognition(false);
   // Registers a new event listener for KeyPhraseRecognized events.
   // (We call this event listener heyMisty, but you can use any name
   // you like. Giving event listeners a custom name means you can
   // create multiple event listeners for the same type of event in a
   // single skill.) Our heyMisty event listener has a debounce of
   // 10 ms, and we set the fourth argument (keepAlive) to true,
   // which tells the system to keep listening for heyMisty events
   // after the first message comes back.
   misty.RegisterEvent("heyMisty","KeyPhraseRecognized", 10, false);
   misty.Debug("Started wake word detection. Misty will play a sound when she hears 'Hey Misty'.");
}

/*
Note: By default, when the system sends an event message, our skill
passes that message into a callback function with the same name as our
registered event listener, prefixed with an underscore. (In this case,
that's "_heyMisty()"). You can customize the name of this callback
method by passing in a different name as an optional argument when you
call the misty.RegisterEvent() method.
*/

// Defines the callback function that Misty executes when she hears the
// key phrase. (In this example, we just print a debug message and
// change Misty's LED to green.)
function _heyMisty() {
   misty.Debug("Key phrase recognized!");
   misty.ChangeLED(0, 255, 0);
}