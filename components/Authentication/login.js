import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ImageBackground, Button, TextInput} from 'react-native';
import  AsyncStorage  from '@react-native-community/async-storage';
// import StyledButton from '../StyledButton';
// import styles from './style';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const Login = (props) => {
// const {name,tagline,image} = props;
const [savedUserData, setSavedUserData] = useState({ email: '', password: ''});
 
//LOGIN button function
const clickHandler = async (req) => {
   axios.post('http://192.168.1.130:5000/signin', savedUserData) //connected to the server port
   .then(async req =>{
    //  console.log(req)
     const token = req.data.token
    try {
        //to save token of logged in user in the storage
     await AsyncStorage.setItem('token', token)  
     console.log('saved', token)
     }
    catch (e){
    console.log(e)
    }
        //to get token of logged in user in the storage
    const trial = await AsyncStorage.getItem('token')
    if (trial) {  //trial.length
        console.log('token is saved in storage, token length', trial.length)
    } else {
       console.log('nooooo token in storage')
    }
    // setSavedUserData(savedUserData)
    console.log(savedUserData)
    console.log("success")
   })
   .catch((error) => {
       console.log("error", error)
   })
   
}
//this function is only for checking if storage is filled with token of it is empty
//it is called in check button inside render
const checkIfLoggedIn = async () => {
try {
     const trial = await AsyncStorage.getItem('token')
     
    if (trial) {
        console.log('loggedin', trial)
    } else {
        console.log('not loggedin')
    }
}catch (e){
console.log(e)
}
 
  }; 
//to logout and clear storage for token
  const logout = async () => {
      try {
          await AsyncStorage.removeItem('token')
          const isloggedin = await AsyncStorage.getItem('token')
          console.log(isloggedin)
             }catch(e){
                console.log(e)
          }
    }
    return (
        <View >
            {/* <Text>{value}</Text> */}
            <Text style = {styles.margin}>Log in</Text>
            <View style = {styles.buttonContainer}>
            {/* <Text>My name is {name}</Text> */}
            <Text>Enter your Email</Text>
            <TextInput 
            style={styles.input}
            placeholder='example@xxxmail.com'
            // onChangeText={(val) => setSavedUserData(val)}
            onChangeText={(email) => setSavedUserData({...savedUserData, email: email})}/>

            <Text>Enter your Password</Text>
            <TextInput 
            // keyboardType='default'
            style={styles.input}
            placeholder='e.g .!@#123Aa'
            onChangeText={(password) => setSavedUserData({...savedUserData, password:password})}/>
            <Button title = "login" onPress = {clickHandler}/>
            {/* <Button title = "check" onPress = { checkIfLoggedIn}/> */}
            <Button title = "logout" onPress = {logout}/>
                </View>
            </View>
                )
}

const styles = StyleSheet.create({
containers: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
buttonContainer: {
    marginTop: 20
},
margin: {
    margin: 30
},
input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin:10,
    width: 200,
}
})

export default Login;

