import React, {Component} from 'react';
import {StyleSheet,View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView} from 'react-native';

export default class LoginForm extends Component {
  render() {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <TextInput 
            placeholder="Correo electrónico"
            placeholderTextColor="rgba(255,255,255,0.8)"
            returnKeyType="next"
            onSubmitEditing={()=> this.passwordInput.focus()}
            keyboardType="email-address"
            style={styles.input}/>
            <TextInput 
            placeholder="Contraseña"
            placeholderTextColor="rgba(255,255,255,0.8)"
            secureTextEntry
            returnKeyType="go"
            style={styles.input}
            ref={(input) => this.passwordInput = input} />

            <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
      );
    
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
      height: 40,
      backgroundColor: 'rgba(255,255,255,0.3)',
      marginBottom: 20,
      color: '#FFF',
      paddingHorizontal:10
  },
  buttonContainer: {
      backgroundColor: '#2980b9',
      marginBottom: 20,
      paddingVertical: 15
  },
  buttonText: {
      textAlign: 'center',
      color: '#FFFFFF'
  }
});
