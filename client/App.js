/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, } from 'react-native';
import {StackNavigator} from 'react-navigation'
import Login from './src/components/login'
import List from './src/components/List'


const Application = StackNavigator({
  LoginScreen: {
      screen: Login,
      navigationOptions: {
        header: false
    }
  },
  ListScreen: {
      screen: List,
      navigationOptions: {
          header: false
      }
  }
})

export default class App extends Component{
  render() {
      return (
        <Application/>
      );
    
    
  }
}


