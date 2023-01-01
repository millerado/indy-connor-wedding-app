import * as React from 'react';
import { AppRegistry } from 'react-native';
import { expo } from './app.json';
import App from './src/App';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);

export default function Main() {
  return (
    <App />
  );
}

AppRegistry.registerComponent(expo.name, () => Main);