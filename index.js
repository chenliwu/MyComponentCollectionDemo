/** @format */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import AppDrawerNavigator from './src/AppDrawerNavigator';
import AppRootNavigator from './src/AppRootNavigator';

AppRegistry.registerComponent(appName, () => AppDrawerNavigator);
