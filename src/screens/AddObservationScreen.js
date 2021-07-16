import React, { useState }  from 'react';
import { Button, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from './../styles/app.style';
import { login } from '../api/authentication';
import { setToken } from '../api/token';
import ObservationForm from '../forms/ObservationForm';



export default function AddObservationScreen({ route, navigation }) {


 return (
  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ObservationForm
        buttonText="Log in"
        onSubmit={login}
    >

    </ObservationForm>
  </KeyboardAvoidingView>
);

}

