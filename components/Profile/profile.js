import React, {useEffect, useState}from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import  AsyncStorage  from '@react-native-community/async-storage';
// import StyledButton from '../StyledButton';
// import styles from './style';
import axios from 'axios';
const Profile = ({navigation}) => {
//hooks to set state
const [profile, setProfile] = useState("");
const [user, setUser] = useState("")
console.log(profile)
//to get the data directly ==> useEffect
//to know which user
//get id from local storage
//var User = id from local storage
//filter the array of objects to user id
//map over the user's object and render it's data
useEffect(() => {
    axios.get('http://192.168.1.94:5000/UserProfile')
    .then( res => {
         setProfile(res.data)  
          console.log(profile)  
    })
    .catch((error) => {
        console.log(error);
    })
},[profile]);
useEffect( async () => {
  try {
    const value = await AsyncStorage.getItem('user_id');
    setUser(value)
    if (value !== null) {
      // We have data!!
    }
  } catch (error) {
    // Error retrieving data
  }
},[]);
console.log(user)
const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 150,
      height: 150,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });
  const logout = async () => {
    try {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('user_id')
           }catch(e){
              console.log(e)
        }
        navigation.navigate('Home')
  }
  return (
    <View>
     <Button onPress={() => navigation.openDrawer()} title="menu"/>
    <Button onPress={logout} title="Sign out"/>
  {Object.entries(profile).filter(([key, y]) => 
      y.userID == user).map(([key,v]) => {
          return  <View key={key}>
          <Text>
          <Image style={styles.tinyLogo} source={{ uri: v.image,}}/>
          <Text>username: {v.username}</Text>
          <Text>email: {v.email}</Text>
          <Text>phone number: {v.phoneNumber}</Text>
           <Button onPress={() => navigation.navigate(('update profile') ,{id : v.userID} )} title="update profile"/>
          </Text>
                 </View>
      })}
   </View>
  )
  }
export default Profile;