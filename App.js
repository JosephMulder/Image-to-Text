/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './screens/MainScreen';
import ScannerScreen from './screens/ScannerScreen';

// const AppNavigator = createStackNavigator(
//   {
//     Home: MainScreen,
//     Scan: ScannerScreen
//   },
//   {
//     initialRouteName: 'Home',
//     headerMode: 'none'
//   }
// );

// const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <ScannerScreen />;
  }
}