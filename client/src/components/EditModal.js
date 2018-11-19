import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image, Alert, TouchableHighlight, AppRegistry, Dimensions, TextInput} from 'react-native';
import Modal  from 'react-native-modalbox';
import Button from "react-native-button";  
import flatListData from '../../data/flatListData';
 var screen = Dimensions.get('window');
 const BaseUrl = 'http://10.0.2.2:3000/products/';
 const upd = '/update';

 export default class EditModal extends Component{

    constructor(props) {
        super(props);
        this.state = {
            FoodName: '',
            FoodPrice: '',
            FoodDescription: '',
            FoodUrl: ''
        }
    }
    showEditModal = (editingFood, flatlistItem) =>{
        this.setState ({
            _id: editingFood._id,
            FoodName:editingFood.name,
            FoodPrice: editingFood.price.toString(),
            FoodDescription: editingFood.description,
            flatlistItem: flatlistItem
        });
        this.refs.myModal.open();
    }
    generateKey = (numberOfCharacters) => {
        return require('random-string')({length: numberOfCharacters});
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
          <Text style={styles.TextModal}>Modificar producto</Text>


          <TextInput 
          style={styles.TextInputModal} 
          onChangeText={(text) => this.setState({FoodName: text})}
          placeholder="Nombre"
          value={this.state.FoodName}/>


          <TextInput 
          style={styles.TextInputModal} 
          onChangeText={(text) => this.setState({FoodPrice: parseInt(text)})}
          placeholder="Price"
          keyboardType='numeric'
          value={this.state.FoodPrice}/>


          <TextInput 
          style={styles.TextInputModal} 
          onChangeText={(text) => this.setState({FoodDescription: text})}
          placeholder="Description"
          value={this.state.FoodDescription}/>

          <Button 
          style={styles.ButtonModal}
          containerStyle={styles.ButtonContainer}
          onPress={()=> {
              if (this.state.FoodName.length == 0 ||this.state.FoodPrice.length == 0 ||this.state.FoodDescription.length == 0 ){
                  alert("Debe llenar todos los campos");
                  return;
              }
              //Update Existing food
              const UpdateUrl = BaseUrl + this.state._id + upd;
              const body = {
                  name: this.state.FoodName,
                  price: this.state.FoodPrice,
                  description: this.state.FoodDescription
              }

              fetch(UpdateUrl, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then((res)=> {
                this.state.flatlistItem.refreshFlatListItem({
                    name: this.state.FoodName,
                  price: this.state.FoodPrice,
                  description: this.state.FoodDescription
                });
                this.refs.myModal.close();
            }).catch(error => {
                alert(error);
                this.refs.myModal.close();
            })
              //this.state.flatlistItem.refreshFlatListItem();
              //this.refs.myModal.close();
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
            color:'#8d6e63',
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
            color: 'white',
            
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