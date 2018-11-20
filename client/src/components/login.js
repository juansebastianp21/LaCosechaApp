import React from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage, Image, TextInput, Button, KeyboardAvoidingView, TouchableOpacity} from 'react-native';

import List from './List';
//import { LoginScreen, ListScreen} from '../../screenNames'

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            url: 'http://10.0.2.2:3000/user/login'
        }
    }
    
    componentDidMount() {
        this._loadInitialState();
    }

    _loadInitialState = async () => {

        var value = await AsyncStorage.getItem('user');
        if (value !== null) {
            this.props.navigation.navigate('ListScreen');
        }
    }

      render(){
        const {navigate} = this.props.navigation;
        return(
            <View style = {styles.container}>
                <View style = {styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../icons/logo.png')}></Image>
                    
                </View>
                <View style = {styles.formContainer}>
                <KeyboardAvoidingView behavior="padding" style={styles.Keycontainer}>
                        <TextInput 
                        placeholder="Correo electrónico"
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        returnKeyType="next"
                        onSubmitEditing={()=> this.passwordInput.focus()}
                        keyboardType="email-address"
                        style={styles.input}
                        onChangeText={(inputemail) => this.setState({email: inputemail})}/>

                        <TextInput 
                        placeholder="Contraseña"
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        secureTextEntry
                        returnKeyType="go"
                        style={styles.input}
                        ref={(input) => this.passwordInput = input} 
                        onChangeText={(inputpass) => this.setState({password: inputpass})}
                        />

                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text style={styles.buttonText}
                            onPress={()=>{

                                            fetch(this.state.url,{
                                                method: 'POST',
                                                headers: {
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                    email: this.state.email,
                                                    password: this.state.password
                                                })
                                            })
                                            .then(res => {
                                                if (res.status == 200)
                                                {
                                                    AsyncStorage.setItem('user', this.state.email);
                                                    navigate('ListScreen');
                                                }
                                                else {
                                                    res.json().then(res => alert(res.message))
                                                }
                                            
                                            })


                                
                                
                            }
                            }
                            >LOGIN</Text>
                        </TouchableOpacity>

                    </KeyboardAvoidingView>
                </View>
            </View>
        );
      }
    
};
    

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#8d6e63'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 300,
        height:150
    },
    Keycontainer: {
        padding: 20,
      },
      input: {
          height: 40,
          backgroundColor: 'rgba(255,255,255,0.3)',
          marginBottom: 20,
          color: '#FFF',
          paddingHorizontal:10
      },
      buttonContainer: {
          backgroundColor: '#d50000',
          marginBottom: 20,
          paddingVertical: 15
      },
      buttonText: {
          textAlign: 'center',
          color: '#FFFFFF'
      }
  });