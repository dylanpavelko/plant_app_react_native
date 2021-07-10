import React, { useState }  from 'react';
import { Button, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from './../styles/app.style';
import { login } from '../api/authentication';
import { setToken } from '../api/token';
import LoginForm from '../forms/LoginForm';



export default function LogInScreen({ route, navigation }) {


 return (

  <LoginForm
      buttonText="Log in"
      onSubmit={login}
      onAuthentication={() => navigation.navigate('My Plants')}
  >

  </LoginForm>
);

}



//https://scottdomes.com/react-native-authentication/