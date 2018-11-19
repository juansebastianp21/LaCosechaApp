import React from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Image, TextInput, Button} from 'react-native';
import LoginForm from './loginForm';


export default class Login extends React.Component {

      render(){
        
        return(
            <View style = {styles.container}>
                <View style = {styles.logoContainer}>
                    <Image style={styles.logo} source={require('../images/logo.png')}></Image>
                </View>
                <View style = {styles.formContainer}>
                    <LoginForm/>
                </View>
            </View>
        );
      }
    
};
    

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3498db'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 250,
        height:100
    }
  });