import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image} from 'react-native';


export default class ProductCreate extends Component{


    constructor(props){
    super(props);
    this.state = {
      loading: false,
      product: [],
      url: 'http://10.0.2.2:3000/products'
    }
  }


  render() {
      return 
    
    
  }
}

