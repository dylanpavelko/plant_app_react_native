import React, { Component } from 'react';
import { Button, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import fetch from 'isomorphic-fetch';
import styles from './../styles/app.style';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }
handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

handleOnSubmit = (event) => {
  navigation.navigate('CreateAccount')
//     event.preventDefault()
//     let request = {"auth": {"email": this.state.email, "password": this.state.password}}
// fetch('/api/user_token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(request)
//     })
//     .then(function(rsp){
//       if (!rsp.ok) {
//         throw Error(rsp.statusText);
//       }
//       return rsp.json()
//     })
//     .then((data) => localStorage.setItem("jwt", data.jwt))
//     .catch(error => {console.log(error)});
  }

render(){
    return(


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

    )
  }
}
export default App;




// <KeyboardAvoidingView 
//     style={styles.container}
//     behavior='padding'>

//     <View style={styles.inputView} >
//       <TextInput 
//         style={styles.inputText} 
//         keyboardType="email-address"
//         placeholder="Email/Username..."
//         onChangeText={text => setEmail(text)} />
//     </View>
//     <View style={styles.inputView} >
//     <TextInput secureTextEntry 
//       style={styles.inputText} 
//       placeholder="Password..." 
//       onChangeText={text => setPassword(text)} />
//     </View>
//     <TouchableOpacity 
//       style={styles.loginBtn}
//       onClick={login()}>
//           <Text style={styles.inputText}>LOGIN</Text>
//     </TouchableOpacity>

//   </KeyboardAvoidingView>