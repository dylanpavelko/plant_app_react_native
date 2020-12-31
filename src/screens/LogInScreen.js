import React, { useState }  from 'react';
import { Button, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from './../styles/app.style';


export default function LogInScreen({ route, navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


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
      onPress={() => navigation.navigate('My Plants')}>
          <Text style={styles.inputText}>LOGIN</Text>
    </TouchableOpacity>

  </KeyboardAvoidingView>
);

}