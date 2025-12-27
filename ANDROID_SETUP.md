# Running on Android Simulator

## Prerequisites

1. **Java Development Kit (JDK)**
   - Install JDK 8 or JDK 11
   ```bash
   brew install --cask adoptopenjdk8
   ```

2. **Android Studio**
   - Download from https://developer.android.com/studio
   - Install and open Android Studio
   - Go to "SDK Manager" and install:
     - Android SDK Platform (Latest API level)
     - Android SDK Build-Tools
     - Android SDK Platform-Tools
     - Android Emulator

3. **Set Environment Variables**
   Add to your `~/.zshrc` or `~/.bash_profile`:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/emulator
   ```

   Then reload:
   ```bash
   source ~/.zshrc
   ```

4. **Create Android Virtual Device (AVD)**
   - Open Android Studio
   - Go to Tools → Device Manager
   - Click "Create Device"
   - Select a device (e.g., Pixel 5)
   - Download and select a system image (e.g., Android 11 - API 30)
   - Finish setup

## Steps to Run on Android

### 1. Add Android Platform
```bash
# Make sure you're using Node 18
nvm use 18

# Add Android platform
ionic cordova platform add android
```

### 2. Build the Android App
```bash
# Build the app
ionic cordova build android

# Or build for release
ionic cordova build android --prod --release
```

### 3. Run on Emulator
```bash
# List available emulators
emulator -list-avds

# Start an emulator (replace with your AVD name)
emulator -avd Pixel_5_API_30 &

# Wait for emulator to start, then run the app
ionic cordova run android
```

### Alternative: Run in One Command
```bash
# This will build and run on the first available emulator
ionic cordova emulate android
```

### 4. Run with Live Reload (Development)
```bash
# Run with live reload for development
ionic cordova run android -l
```

## Common Issues & Solutions

### Issue: Gradle build fails
**Solution:**
```bash
cd platforms/android
./gradlew clean
cd ../..
ionic cordova build android
```

### Issue: "SDK location not found"
**Solution:**
Create a `local.properties` file in `platforms/android/`:
```
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
```

### Issue: Emulator won't start
**Solution:**
```bash
# Check if emulator is already running
adb devices

# Kill all ADB processes
adb kill-server
adb start-server

# Try starting emulator again
emulator -avd YOUR_AVD_NAME
```

### Issue: App not updating on device
**Solution:**
```bash
# Uninstall the app first
adb uninstall io.ionic.starter

# Then rebuild and run
ionic cordova run android
```

## Quick Commands Cheat Sheet

```bash
# Check environment
java -version
$ANDROID_HOME
adb version

# List devices/emulators
adb devices
emulator -list-avds

# Build and run
ionic cordova build android          # Build only
ionic cordova run android            # Build and run
ionic cordova emulate android        # Build and run on emulator
ionic cordova run android -l         # With live reload

# Debugging
ionic cordova run android --console  # Show console logs
adb logcat                          # View device logs
chrome://inspect                     # Debug in Chrome DevTools
```

## Running on Physical Device

1. **Enable Developer Options** on your Android device:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times

2. **Enable USB Debugging**:
   - Go to Settings → Developer Options
   - Enable "USB Debugging"

3. **Connect device** via USB

4. **Run the app**:
   ```bash
   adb devices  # Should show your device
   ionic cordova run android --device
   ```

## Build for Production

```bash
# Generate release APK
ionic cordova build android --prod --release

# Sign the APK (required for Play Store)
# The APK will be in: platforms/android/app/build/outputs/apk/release/
```

## Tips

- Use `--verbose` flag for detailed error messages: `ionic cordova build android --verbose`
- Check console logs while app is running: `adb logcat | grep "chromium"`
- For faster builds, use `--no-build` if you've already built: `ionic cordova run android --no-build`
- Emulators run faster with Intel HAXM (Hardware Accelerated Execution Manager) installed

## Troubleshooting Build Issues

If you encounter persistent build issues:

```bash
# Clean everything
rm -rf platforms/
rm -rf plugins/
rm -rf node_modules/

# Reinstall
npm install --legacy-peer-deps
ionic cordova platform add android
ionic cordova build android
```
