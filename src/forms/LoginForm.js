import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { setToken } from '../api/token';
import styles from './../styles/app.style';


const LoginForm = ({ buttonText, onSubmit, children, onAuthentication }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submit = () => {
    onSubmit(email, password)
      .then(async (res) => {
        console.log('response in submit ' + JSON.stringify(res))
        await setToken(res.token);
        onAuthentication();
      })
      .catch((res) => {
      	if (res && res.error) {
      		setErrorMessage(res.error);
      	}
        console.log(res)
      	setErrorMessage('Something went wrong');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    	<View style={styles.inputView}>
      <TextInput
        style={styles.inputText}
        autoCapitalize='none'
        onChangeText={(text) => onChangeEmail(text)}
        value={email}
        keyboardType="email-address"
        placeholder="Email/Username..."
        placeholderTextColor="#CCC" 
      />
      </View>
      <View style={styles.inputView}>
      <TextInput
        style={styles.inputText}
        onChangeText={(text) => onChangePassword(text)}
        value={password}
        placeholder="Password..." 
        placeholderTextColor="#CCC" 
        secureTextEntry
      />
      </View>
      <TouchableOpacity 
      style={styles.loginBtn}
      onPress={submit}>
          <Text style={styles.inputText}>{buttonText}</Text>
      </TouchableOpacity>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {children}
      
    </ScrollView>
  );
};

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
  },
});

export default LoginForm;