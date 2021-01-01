import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Platform, Button, Image, TextInput } from 'react-native';
// import Photo from './components/Authentication/imagePicker';
import Login from './components/Authentication/login';
import Signup from './components/Authentication/signup';
import * as ImagePicker from 'expo-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Constants from 'expo-constants';
import axios from 'axios';
import  AsyncStorage  from '@react-native-community/async-storage';


export default function App() {
  // AsyncStorage.removeItem('token')
  
  return (
    <View style={styles.container}>
      <Text>hello world!</Text>
      <Login />
     {/* <Signup/> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
