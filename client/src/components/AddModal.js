import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image, Alert, TouchableHighlight, AppRegistry, Dimensions, TextInput} from 'react-native';
import Modal  from 'react-native-modalbox';
import Button from "react-native-button";  
import flatListData from '../../data/flatListData';
 var screen = Dimensions.get('window');
 const url = 'http://10.0.2.2:3000/products/create'
 export default class AddModal extends Component{

    constructor(props) {
        super(props);
        this.state = {
            newFoodName: '',
            newFoodPrice: '',
            newFoodDescription: '',
            newFoodUrl: ''
        }
    }
    showAddModal = () =>{
        this.refs.myModal.open();
    }
    generateKey = (numberOfCharacters) => {
        return require('random-string')({length: numberOfCharacters});
    }
    insertNewFoodToServer = (newFoodInformation) => {
        const url = 'http://10.0.2.2:3000/products/create'
        fetch(url,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFoodInformation)
        })
    }

    render() {
        return (
          <Modal 
          ref={"myModal"}
          style={styles.Modal}
          position='center'
          backdrop={true}
          onClosed={() => {
              //alert("Modal cerrado");
          }}
          >
          <Text style={styles.TextModal}>Nuevo producto</Text>
          <TextInput 
          style={styles.TextInputModal} 
          onChangeText={(text) => this.setState({newFoodName: text})}
          placeholder="Nombre"
          value={this.state.newFoodName}/>
          <TextInput 
          style={styles.TextInputModal} 
          onChangeText={(text) => this.setState({newFoodPrice: parseInt(text)})}
          placeholder="Price"
          keyboardType='numeric'
          value={this.state.newFoodPrice}/>
          <TextInput 
          style={styles.TextInputModal} 
          onChangeText={(text) => this.setState({newFoodDescription: text})}
          placeholder="Description"
          value={this.state.newFoodDescription}/>

          <Button 
          style={styles.ButtonModal}
          containerStyle={styles.ButtonContainer}
          onPress={()=> {
              if (this.state.newFoodName.length == 0 ||this.state.newFoodPrice.length == 0 ||this.state.newFoodDescription.length == 0 ){
                  alert("Debe llenar todos los campos");
                  return;
              }
              const newKey = this.generateKey(24)
              const newFood = {
                  name: this.state.newFoodName,
                  price: this.state.newFoodPrice,
                  description: this.state.newFoodDescription,
                  image_url: 'https://cdn.colombia.com/sdi/2011/07/22/ajiaco-496022.jpg'
              };
              //flatListData.push(newFood);
              //this.props.parentFlatList.refreshList(newKey);
              fetch(url,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newFood)
            })
            .then((result) => {
                this.props.parentFlatList.refreshDataFromServer();
              });

              this.refs.myModal.close();
          }}>
              Agregar
          </Button>
          </Modal>
        );
      
      
    }
  }



  const styles = StyleSheet.create({
      Modal: {
          justifyContent: 'center',
          borderRadius: Platform.OS === 'ios' ? 30:0,
          shadowRadius: 10,
          width: screen.width - 80,
          height:330
        },
        TextModal:{
            color: '#8d6e63',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 20,
        },
        TextInputModal: {
            height: 40,
            borderBottomColor: 'gray',
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
            marginBottom: 10,
            borderBottomWidth: 1
        },
        ButtonModal: {
            fontSize: 18,
            color: 'white'
        },
        ButtonContainer: {
            padding: 8,
            marginLeft: 70,
            marginRight: 70,
            height: 40,
            borderRadius: 6,
            backgroundColor: '#d50000',
            marginTop: 5
        }

  });