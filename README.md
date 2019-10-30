# msu-frontend

![MSU](http://msucongress.com/wp-content/uploads/2017/10/msulogominutes.jpg)

This is the official codebase for the frontend of the Marianopolis Student Union mobile app.

## Required Libaries and Tools

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [NodeJS and npm](https://www.npmjs.com/get-npm)
* [React Native](https://facebook.github.io/react-native/docs/getting-started)

Install React-Native with npm by typing `npm install -g react-native-cli` in cmd (Windows) or Terminal (MacOS or Linux). This command installs React Native globally on your computer for all your projects.

## Installation

```
git clone <msu-frontend>
cd msu-frontend
npm install
```

## Project Structure

* `/src`: React Native code used by `App.js` for the mobile frontend
* `App.js`: React Native application that is exported
* `package.json`: JSON file with list of dependencies
* `README.md`: markdown file that contains information to be read by the programmer
* `/__tests__`: contains tests
* `/android`: files to be used to build (create) the Android app
* `/ios`: files to be used to build (create) the iOS app
* `/node_modules`: JavaScript dependencies
* `/scripts`: miscellaneous Bash scripts
* `/static`: static content that is stored locally (such as images)
* `.gitattributes`: assigns attributes to filenames
* `.gitignore`: folders and files that git ignores
* `app.json`: Metadata (information) about the React Native app
* `babel.config.js`: configurations for Babel (JavaScript compiler)
* `index.js`: React Native file that connects App.js to the native mobile language
* `metro.config.js`: configurations for Metro (design language)
* `package-lock.json`: JSON file that records the exact versions of dependencies

## Running the App Locally

A lengthy process is needed to run the app on an emulator (phone simulator) or on a physical form. For brevity, this README will omit the steps and believes that the official React Native docs (Getting Started at https://facebook.github.io/react-native/docs/getting-started) will be easier to do. 

Make sure you view the tab **React Native CLI Quickstart** and select your development options.

If there are errors popping up (which is usually normal for the first use), searching the errors on Google or Stack Overflow is usually a good approach. If those steps don't help, the programmer can always post on the **Issues** part of this GitHub repo and the creators of the app will be fast to respond.
