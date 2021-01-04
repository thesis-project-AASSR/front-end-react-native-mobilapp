import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Platform, Button, Image, TextInput } from 'react-native';
import Photo from './components/Authentication/imagePicker';
import Login from './components/Authentication/login';
import Signup from './components/Authentication/signup';
import Notification from './components/notifications/notifications';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';


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
import Edit from './components/List items/editItem'
import LocationSearchModal from './components/map'
import main from './components/chat/Main'
import chat from './components/chat/Chat'
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
 
  return (
    
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home"  >
      <Drawer.Screen name="Home" component={HomeScreen}  />
      {/* {(typeof(getValue) == "number") ? ( */}
      <Drawer.Screen name="Profile" component={profile}/>
      <Drawer.Screen name="Add new item" component={addItems}/> 
      <Drawer.Screen name="All Items" component={items}/> 
      <Drawer.Screen name="Edit" component={Edit} />
      <Drawer.Screen name="MapScreen" component={LocationSearchModal} />
      <Drawer.Screen name="Main" component={main} />
      <Drawer.Screen name="Chat" component={chat} />
      {/* ) */}
      {/* : ( */}
      <Drawer.Screen name="Sign Up" component={signup} />
      <Drawer.Screen name="Sign In" component={login} />
       <Drawer.Screen name="update profile" component={EditProfile}/> 
      
      
     
     
    
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