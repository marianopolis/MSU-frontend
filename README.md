# msu-frontend

![MSU](http://msucongress.com/wp-content/uploads/2017/10/msulogominutes.jpg)

The official codebase for the frontend of the Marianopolis Student Union
app.

## Requirements

* Git
* NodeJS

**Android**
* Java Development Kit (JDK)
* Android SDK
* Android SDK Platform Tools
* (Optional) Android Studio
* (Optional) Android device

**iOS**
* A Mac
* XCode
* XCode Command Line Tools
* CocoaPods
* (Optional) iOS device

To manage dependencies, use [homebrew](https://brew.sh/) on Mac
or [chocolatey](https://chocolatey.org/) on Windows.

Following is a rough outline of the steps needed to install the
requirements. For more information, see the official React Native
[Getting Started Guide](https://facebook.github.io/react-native/docs/getting-started).

### Windows

Open a command prompt as administrator and run
```
> choco install git nodejs adb androidstudio
```

During Android Studio's setup, make sure to enable the **Android SDK**.
To configure the Android SDK, launch Android Studio, and on the welcome
screen do **Configure > SDK Manager**. At the top of the SDK Manager
window, you'll see an **Android SDK Location**. Set the
`ANDROID_HOME` environment variable to this value:

1. **Start Menu > Search "environment variables" >
  "Edit the system environment variables" > Environment Variables**
2. Under System Variables, set **ANDROID_HOME** to the Android
   SDK Location unless it's already set to the correct value.

Don't forget to open a new command prompt to see the changes!

If you want to use a physical device, configure
[USB Debugging](https://developer.android.com/studio/command-line/adb#Enabling)
on your Android device. Otherwise, open the repository's `android/`
folder in Android Studio and
[create a new virtual device](https://developer.android.com/studio/run/managing-avds.html).

### Mac

On Macs, developing for iOS is significantly easier. If you want to
develop for Android, see the "Getting Started Guide" linked above.
Otherwise:

```
$ xcode-select --install
```

If you haven't already installed the XCode Command Line Tools, this will
prompt you to install them. If so, install the tools and run the command
again.

Then, ensure `brew` is ready to brew:

```
$ brew doctor
```

And finally, install the requirements:

```
$ brew install git node watchman cocoapods
```

## Configuration

In the root, create a file `.env` with the contents:

```
SERVER_URL="<url to backend server>"
```

This configuration can be accessed as such:

```typescript
import Config from 'react-native-config';
Config.SERVER_URL // access value from .env
```

For more information, see the documentation on
[react-native-config](https://github.com/luggit/react-native-config).

## Setup

Once dependencies are installed and configured, clone the repo and
install dependencies.

```
git clone <link/to/msu-frontend>
cd msu-frontend
npm install
```

For Android, ensure the relevant device, physical or virtual, is
detected:

```
$ adb devices
```

Then, after configuring as described above, run:

```
$ npm start
```

Finally, in another terminal run `npm run android` or `npm run ios`.

## Versioning

Versions are managed using
[react-native-version](https://github.com/stovmascript/react-native-version)
and follow [Semantic Versioning](https://semver.org/).

Before publishing a new version of the app, make sure to update the
version, minor for feature additions and patch for bug fixes:

```
npm version [minor|patch]
```

This will
* Create a new commit and a corresponding git tag
* Increment the Android build number
* Update the iOS version number to correspond

If you need to publish a new build of a version that has already been
published, say if the published build is faulty, then you can just
increment the build number:

`npx react-native-version --target [android|ios] --increment-build`

This will amend the change to the previous commit, so make sure to only
run this after version bumps.

## Building Release Variants

First, generate app images from `assets/icon.png` and
`assets/splash.png`:

```
$ npm run genimages
```

### Android

1. Place the upload key `msu.keystore` under `android/app`.

2. Configure the environment:

```
MSUAPP_UPLOAD_STORE_FILE="msu.keystore"
MSUAPP_UPLOAD_STORE_PASSWORD= # the keystore password
MSUAPP_UPLOAD_KEY_ALIAS= # key alias
MSUAPP_UPLOAD_KEY_PASSWORD= # key password
```

3. `npm run release:android`

The app bundle should be built at
`android/app/build/outputs/bundle/release/app.aab`.

### iOS

1. Open the project using XCode: `open ios/msuapp.xcodeproj`
2. Test the app: **Product > Run**
3. **Product > Archive**
4. **Distribute app..**

## Contributing

Before starting, make sure to thoroughly understand core concepts:
* [React](https://reactjs.org/docs/getting-started.html)
* [React Native](https://facebook.github.io/react-native/docs/getting-started)
* [TypeScript](https://www.typescriptlang.org/docs/handbook/basic-types.html)
* [React Navigation](https://reactnavigation.org/docs/en/next/getting-started.html)

### Project Structure

* `index.js`: Entrypoint to the app, generally shouldn't be edited.
* `App.tsx`: Exports the `App` component.
* `src/`: All other project code.
* `assets/`: Static assets, such as images.

### Project Conventions

* In TypeScript, files containing [JSX](https://reactjs.org/docs/introducing-jsx.html)
must have a `*.tsx` extension.

* Prefer React [Hooks](https://reactjs.org/docs/hooks-intro.html)
over class components.

* Apply type signatures generously and avoid using the `any` type.

* Components should be default exported in a file named
`ComponentName.tsx` and formatted as shown below. Otherwise, `*.ts` is
used.

```typescript
// ComponentName.tsx
// -----------------
import React, { /* ... */ } from 'react';
import { StyleSheet, /* ... */ } from 'react-native';

interface Props {
  propName: string,
  // other props...
}

const ComponentName = ({propName, /* ... */}: Props) => {
  // ...
};

const styles = StyleSheet.create({
  // Only necessary if styles are needed.
  // Otherwise, this section can be omitted.
})

export default ComponentName;
```

Alternatively, if `ComponentName` has modules specific to it, then it
may be setup as follows:
```
src/ComponentName/
|-- index.tsx # instead of ComponentName.tsx
|-- DependingComponent.tsx
|-- utilsForComponentName.ts
|-- ...
```

* Other files, i.e. files which don't export components, should be named
in the format `fileName.ts`, to differentiate them from component files.
