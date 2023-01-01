# indy-connor-wedding-app

### Setting Up Development Environment:
`npm install`
`npm install -g @aws-amplify/cli` Install Amplify CLI, if not already installed
`npm install --global expo-cli` Install Expo CLI, if not already installed (you may also need to login: https://docs.expo.dev/get-started/installation/)
`amplify pull --appId [projectId] --envName dev` Pull the Amplify project, so that it creates your aws-exports
Create your `.appConfig file` (see notes below on env values)
`expo start` Start expo

### env File
The application expects two values to exist in a `appConfig.js` file:
- `appPasscode=your app passcode`
- `adminPasscode=your admin passcode`

### Amplify Key Commands:
`amplify pull --appId [projectId] --envName dev` pulls latest config for the project
`amplify codegen` Updates your `src/grappql` mutations, queries, and subscriptions
`amplify codegen models` updates you `src/models` with the latest schema from AppSync
`amplify mock api` - Builds out mock functions in case you want to test the API

### Expo Notes
- Generate APK: `eas build -p android --profile preview`
- Build for one platform: `eas build -p android`
- Build for both iOS and Android: `eas build`
- Submit to an App Store: `eas submit --platform android`

### AWS Changes Not Covered in Amplify
- SOMETHING HERE FOR DELTA SYNC