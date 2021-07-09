import React, { useState }  from 'react';
import { Button, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from './../styles/app.style';
import { login } from '../api/mock';
import { setToken } from '../api/token';


export default function LogInScreen({ route, navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loginUser = async () => {
    login('test@test.ca', 'password')
      .then(async (res) => {
        await setToken(res.auth_token);
        navigation.navigate('Home');
      })
      .catch((err) => setErrorMessage(err.message));
  };


 return (
  <KeyboardAvoidingView 
    style={styles.container}
    behavior='padding'>

    <View style={styles.inputView} >
      <TextInput 
        style={styles.inputText} 
        keyboardType="email-address"
        placeholder="Email/Username..."
        onChangeText={text => setEmail(text)} />
    </View>
    <View style={styles.inputView} >
    <TextInput secureTextEntry 
      style={styles.inputText} 
      placeholder="Password..." 
      onChangeText={text => setPassword(text)} />
    </View>
    <TouchableOpacity 
      style={styles.loginBtn}
      onPress={loginUser}>
          <Text style={styles.inputText}>LOGIN</Text>
    </TouchableOpacity>
    {errorMessage ? <Text>{errorMessage}</Text> : null}

  </KeyboardAvoidingView>
);

}