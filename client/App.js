/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image} from 'react-native';
import ProductList from './src/components/Product-list'

export default class App extends Component{


  render() {
      return (
        <ProductList/>
      );
    
    
  }
}


