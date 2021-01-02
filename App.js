import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Platform, Button, Image, TextInput } from 'react-native';
import Photo from './components/Authentication/imagePicker';
import Login from './components/Authentication/login';
import Signup from './components/Authentication/signup';
import Notification from './components/notifications/notifications';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import firebase from './components/List items/firbase';
import { storage } from './components/List items/firbase';
import {AsyncStorage} from '@react-native-community/async-storage'
import profile from './components/Profile/profile';
import EditProfile from './components/Profile/editProfile';
import items from './components/List items/items';
import addItems from './components/List items/addItem';
import signup from './components/Authentication/signup';
import login from './components/Authentication/login';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
// import { StatusBar } from 'expo-status-bar';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* should be in all the components */}
      <Button onPress={() => navigation.openDrawer()} title="menu"/>
      <Text style={styles.container}>Dawerha</Text>
      <Button onPress={() => navigation.navigate('Sign Up')} title="Sign Up"/>
      <Button onPress={() => navigation.navigate('Sign In')} title="Sign In"/>
    </View>
  );
}
const Drawer = createDrawerNavigator();

export default function App() {
  // const [token, setToken] = useState('');
// useEffect ( () => {
//    clickHandler()
// }, [])
// const saveData = async () => {
//   try {
//     await AsyncStorage.setItem('token', 1)
//     alert('Data successfully saved')
//   } catch (e) {
//     alert('Failed to save the data to the storage')
//   }
// }
// const [savedUserData, setSavedUserData] = useState({ email: 'areen@hotmail.com', password: 'areenazzam'});
// //LOGIN button function
// const clickHandler = async (req) => {
//    axios.post('http://192.168.1.13:5000/signin', savedUserData) //connected to the server port
//    .then(async req =>{
//     //  console.log(req.data)
//      const token = req.data.token
//      const user_id = JSON.stringify(req.data.result[0].userID)
//      console.log(user_id)
//      console.log(token)
//     try {
//         //to save token of logged in user in the storage
//      await AsyncStorage.setItem('token', token) 
//      await AsyncStorage.setItem('user_id', user_id)  
//      console.log('saved', token)
//      }
//     catch (e){
//     console.log(e)
//     }
//         //to get token of logged in user in the storage
//     const trial = await AsyncStorage.getItem('user_id')
//     // const trial = await AsyncStorage.getItem('token')
//     console.log(trial)
//     if (trial) {  //trial.length
//         console.log('token is saved in storage, token length', trial.length)
//     } else {
//        console.log('nooooo token in storage')
//     }
//     // setSavedUserData(savedUserData)
//     console.log(savedUserData)
//     console.log("success")
//    })
//    .catch((error) => {
//        console.log("error", error)
//    })
// }
  return (
    // <View>
    // <Button onPress ={click}/>
    // </View>
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home"  >
      <Drawer.Screen name="Home" component={HomeScreen}  />
      {/* {(typeof(getValue) == "number") ? ( */}
      <Drawer.Screen name="Profile" component={profile}/>
      <Drawer.Screen name="Add new item" component={addItems}/> 
      <Drawer.Screen name="All Items" component={items}/> 
      {/* ) */}
      {/* : ( */}
      <Drawer.Screen name="Sign Up" component={signup} />
      <Drawer.Screen name="Sign In" component={login} />
       <Drawer.Screen name="update profile" component={EditProfile}/> 
      {/* ) */}
      {/* } */}
    </Drawer.Navigator>
  </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0,
    fontSize: 50,
    color: 'white',
    backgroundColor: 'green'
  },
});