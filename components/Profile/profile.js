import React, {useEffect, useState}from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import  AsyncStorage  from '@react-native-community/async-storage';
// import StyledButton from '../StyledButton';
// import styles from './style';
import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';
const Profile = (props) => {
//hooks to set state
const [profile, setProfile] = useState("");
console.log(profile)
//to get the data directly ==> useEffect
//to know which user
//get id from local storage
//var User = id from local storage
//filter the array of objects to user id
//map over the user's object and render it's data
useEffect(() => {
    axios.get('http://192.168.8.103:5000/UserProfile')
    .then(async res => {
              
       try{
        //  await AsyncStorage.setItem('user_id', user_id )
         const user =  await AsyncStorage.getItem('user_id');
         console.log(user) 
         setProfile(res.data);
         console.log(res.data);
         for (var i = 0; i < res.data.length; i++) {
          if (res.data[i][0] === user) {
            // return user
            setProfile(res.data);
          }
         }
         
       }
       catch(e) {
         console.log(e)
       }
      
    })
    .catch((error) => {
        console.log(error);
    })
    
},[]);
//to know which user's profile get user id from local storage
  // const [getValue, setGetValue] = useState('');
 
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
        const isloggedin = await AsyncStorage.getItem('user_id')
        console.log(isloggedin)
           }catch(e){
              console.log(e)
        }
        props.navigation.navigate('Home')
  }

return (
  <View>
    <Button onPress={()=> props.navigation.openDrawer()} title="menu"/>
  <Button onPress={logout} title="Sign out"/>
{Object.entries(profile).filter(([key, v]) => 
    v.userID ===  1).map(([key,v]) => {
        return  <View key={key}>
        <Text>
        <Image style={styles.tinyLogo} source={{ uri: v.image,}}/>
        <Text>username: {v.username}</Text>
        <Text>email: {v.email}</Text>
        <Text>phone number: {v.phoneNumber}</Text>
         <Button onPress={() => props.navigation.navigate(('update profile') ,{id : v.userID} )} title="update profile"/>
        </Text>
               </View>
    })}
 </View>
)
}
export default Profile;