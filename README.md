Notice
------
This an experimental app for Android built with Cordova for tracking my working hours, like a punchcard.
There are better apps available at Google Play, you should probably use them instead.

Setup
-----
Download and install Android SDK


   apt-get install lib32z1 lib32stdc++6

   npm install -g cordova



Some usefull commands
---------------------
   cordova create hello com.example.hello HelloWorld
   cd hello

   cordova platform add android
   
   android --help
   android sdk

Run in an emulator
------------------
Create a virtual device:
   adroid avd

Settings example:
AVD Name: NexusS (or some other name)
Device: Nexus S
Target: Android 5.1.1 - API Level 22
CPU: ARM

Start emulator:
   cordova emulate --target=NexusS android

Log output:
   ~/local/android-sdk-linux/platform-tools/adb logcat

To run on a Samsung device
--------------------------
* enable USB debugging on device 
* setup system to detect device
* connect device to USB
see http://developer.android.com/tools/device.html

   cat > /etc/udev/rules.d/51-android.rules <<EOF
   SUBSYSTEM=="usb", ATTR{idVendor}=="04e8", MODE="0666", GROUP="plugdev"
   EOF

   chmod a+r /etc/udev/rules.d/51-android.rules

   cordova run android
