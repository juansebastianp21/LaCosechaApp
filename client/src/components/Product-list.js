/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image} from 'react-native';

export default class ProductList extends Component{

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      product: [],
      url: 'http://10.0.2.2:3000/products'
    }
  }

  componentDidMount(){
    this.getProducts();
  }

  getProducts = () => {
    this.setState({loading:true})

    fetch(this.state.url)
    .then(res => res.json())
    .then(res => {
      this.setState({
        product: res.products,
        loading: false
      })
    })
  }

  render() {
    if(this.state.loading){
      return (
        <View style={styles.container}>
          <Text>Descargando productos</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.product}
          renderItem={
            ({item}) => (
            <View style={styles.container}>
                <Image
              style={{width: 150, height: 150}}
              source={{uri: item.image_url}}
            />
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
            </View>
            ) 
            
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
