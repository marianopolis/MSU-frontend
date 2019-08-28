# msu-frontend

![MSU](http://msucongress.com/wp-content/uploads/2017/10/msulogominutes.jpg)

Hey there!

This is the official code that is used to create the frontend (the screen layout) of the Marianopolis Student Union guide.

To encourage tech literacy for people of all backgrounds, this is the guide that uses simple terms to describe how to download and run this app.

## Installing the Right Tools

This project will NOT work if you do not install Git, NodeJS/npm or React Native.

Scary? Not at all, just follow the instructions on the websites below to install the two tools.

### Git (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
Used for version control, simply just keeping track of progress

### NodeJS and npm (https://www.npmjs.com/get-npm)
JavaScript library and installation tool

Next, install React-Native with npm by typing `npm install -g react-native-cli` in cmd (Windows) or Terminal (MacOS or Linux). This command installs React Native globally on your computer for all your projects.

## Downloading the Frontend

Now, this is the cool part. Open cmd (Windows) or Terminal (MacOs or Linux).

Go to Desktop (or any given directory you want), which you can navigate by using:

* `dir` or `ls` which displays all the files in your current folder
* `pwd` to print the path of your current folder
* `cd <folder name>` to go to a new folder whose name is in `<folder name>`
* `cd ..` to go back one folder

Once you are at your desired folder, type:

`git clone https://github.com/marianopolis/msu-frontend.git`
which should "clone" (download) the repository

then type:

`cd msu-frontend` to enter the folder.

Congratulations! You are in!


## Project Structure

There are multiple folders and files in the msu-frontend directory. Here are the most important ones:

* `/src`: React Native code used by `App.js` for the mobile frontend
* `App.js`: React Native application that is exported
* `package.json`: JSON file with list of dependencies
* `README.md`: markdown file that contains information to be read by the programmer

And here are all the other folders:

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

### Installing React Native dependencies

Type
`npm install`
which install all the dependencies needed to run the project.

A lengthy process is needed to run the app on an emulator (phone simulator) or on a physical form. For brevity, this README will omit the steps and believes that the official React Native docs (Getting Started at https://facebook.github.io/react-native/docs/getting-started) will be easier to do. 

Make sure you view the tab **React Native CLI Quickstart** and select your development options.

If there are errors popping up (which is usually normal for the first use), searching the errors on Google or Stack Overflow is usually a good approach. If those steps don't help, the programmer can always post on the **Issues** part of this GitHub repo and the creators of the app will be fast to respond.
