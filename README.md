# Hazzy Fitness

React Native fitness app with profile setup, workout video, and subscription screens, built on a Crowdbotics project foundation.

## Explore the code

| Area | Source |
| --- | --- |
| Sign-in and registration screens | [Login](screens/Login) · [SignUp](screens/SignUp) |
| Profile questionnaire | [CreateProfileQuestionnare](screens/CreateProfileQuestionnare) |
| Main app navigation and screens | [HomeScreenTabs](screens/HomeScreenTabs) |
| Workout video playback | [WorkoutVideoPlayer](screens/WorkoutVideoPlayer) |
| Subscription and payment screens | [Subscriptions](screens/Subscriptions) · [PaymentScreen](screens/PaymentScreen) |
| State management | [slices](slices) · [store](store) |

## Technology

- React Native 0.64 and React 17
- React Navigation
- Redux Toolkit, React Redux, and Redux Persist
- Axios for HTTP requests
- React Native Video and SVG
- Native Android and iOS projects

Exact dependency versions and commands are listed in [package.json](package.json).

## Project background

This repository was scaffolded with Crowdbotics. The original internal project name, `red-union-32136`, remains in the package configuration. Crowdbotics attribution and licensing are retained below.

## Development setup

This is an older React Native codebase. The original setup instructions below are retained as a starting point; compatibility with current toolchains and availability of backend services have not been verified.

## Project Structure

    .
    ├── ...
    ├── android                 # Android native files
    ├── backend                 # Django backend REST API
    ├── ios                     # iOS native files
    ├── modules                 # Modules
    ├── public                  
    ├── screens                 
    ├── store                   # Application state storage
    ├── ...
    ├── README.md
    └── ...

## Modules (THIS SECTION IS AUTO-GENERATED, PLEASE DO NOT EDIT)

This section will show any installed modules you add from the Storyboard Modules section.
- [react-native-articles](modules/articles)
- [react-native-login](modules/login)
- [react-native-user-profile](modules/user-profile)
- [react-native-push-notifications](modules/push-notifications)
- [react-native-app-menu](modules/app-menu)
- [terms-and-conditions]()
- [privacy-policy]()

# Getting started: Frontend

This section outlines instructions on setting up a local development environment for the frontend of your application.

## Installation

### Metro

After cloning the repo, install the dependencies locally with [Yarn](https://yarnpkg.com/):

```sh
yarn install
```

Start your [Metro](https://facebook.github.io/metro/) server:

```sh
npx react-native start
```

### Android

```sh
npx react-native run-android
```

### iOS

```sh
pod install --repo-update --project-directory=ios
npx react-native run-ios
```

### Setup react-native-vector-icons

Follow instructions at their [README.md](https://github.com/oblador/react-native-vector-icons/blob/master/README.md#installation)

## Running with Fastlane

[Fastlane](https://fastlane.tools/) makes testing, building, and deploying apps
easier.

Install fastlane globally (`npm i -g fastlane` or `yarn i -g fastlane`).
Android and iOS dependencies are the same as React Native CLI.

All fastlane commands are run from the platform directory. For example, Android
commands must be run from `android/`. Fastlane should be executed using `bundle exec` to ensure dependencies are managed correctly.

The commands for Android and iOS are the same:

- Run tests: `bundle exec fastlane tests`
- Local build: `bundle exec fastlane build`
- Build and upload a beta (requires signing): `bundle exec fastlane beta`
- Build or promote a release: `bundle exec fastlane deploy`

### Android

Publish an Android app you must first create an app in the Play Console and
manually upload an APK. After the first upload run `bundle exec fastlane supply init` from `android/` to sync with the Play store. All future releases will be
uploaded automatically.

Android uses tracks. A beta release will build the app and upload to the beta
track. Deploying will promote from beta to production.

### iOS

CB developers must follow fastlane's [codesigning guide](https://codesigning.guide/) for using match.
Match will automatically sign iOS builds.

New CB developers should get access to the codesigning repo and run `bundle exec fastlane match development` from `ios/`.

Not a CB developer? Create an [Apple developer](https://developer.apple.com)
and follow the instructions on [codesigning guide](https://codesigning.guide/)
to setup your certificates.

## React Native Web

It is to build and deploy your app as web platform which run on browser

Please follow the steps

- please run `yarn web-build`
- the web_build folder is generated and copied to backend/ automatically. please commit/push the web_build folder to git

# License
The use of code in this repository is governed by Crowdbotics [Terms and Conditions](https://www.crowdbotics.com/terms-of-service).

Created with ❤️ by [Crowdbotics](https://www.crowdbotics.com/)
