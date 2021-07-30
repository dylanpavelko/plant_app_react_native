import { AsyncStorage } from 'react-native';

export const getToken = async () => {
  //console.log("try to get token")
  try {
    const value = await AsyncStorage.getItem('@auth_token');
    //console.log('token value is ' + value)
    if (value !== null) {
      //console.log("token not null")
      return value;
    }
  } catch (e) {
    //console.log("token error")
    return null;
  }
};

export const setToken = async (token) => {
  try {
    //console.log("trying to set token to value " + token)
    await AsyncStorage.setItem('@auth_token', token);
  } catch (e) {
    //console.log("error setting token")
    return null;
  }
};


//https://scottdomes.com/react-native-authentication/