import React, {useEffect, useState}from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
// import StyledButton from '../StyledButton';
// import styles from './style';
import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';

const Profile = () => {

//hooks to set state
const [profile, setProfile] = useState("");


//to get the data directly ==> useEffect
//to know which user
//get id from local storage
//var User = id from local storage
//filter the array of objects to user id
//map over the user's object and render it's data
//
useEffect( () => {
    axios.get('http://192.168.1.13:5000/UserProfile')
    .then(res => {
        setProfile(res.data);
        console.log(res.data);
    })
    .catch((error) => {
        console.log(error);
    })
},[]);

//to know which user's profile get user id from local storage
// var User=localStorage.getItem('user_id');

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



return (
    <View>
{Object.entries(profile).filter(([key, v]) => 
    v.userID === 1).map(([key,v]) => {
        return  <View key={key}>
        <Text>

        <Image style={styles.tinyLogo} source={{ uri: v.image,}}/>
        <Text>username: {v.username}</Text>
        <Text>email: {v.email}</Text>
        <Text>phone number: {v.phoneNumber}</Text>

        </Text>

   </View>

    })}

     </View>
)

}

export default Profile;

