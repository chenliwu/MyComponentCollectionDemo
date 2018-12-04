/** @format */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import SwipeExample from './src/swipeComponent/react-native-swipe-list-view/SwipeExample';

import AppNavigator from './src/AppNavigator';

AppRegistry.registerComponent(appName, () => AppNavigator);
