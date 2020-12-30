import React, {useEffect, useState}from 'react';
import {View, Text, ImageBackground, Image, StyleSheet} from 'react-native';
// import StyledButton from '../StyledButton';
// import styles from './style';
import axios from 'axios';

const Profile = () => {
// const {name,tagline,image} = props;

//to know which user's profile
// var User=localStorage.getItem('user_id');

//hooks to set state
const [profile, setProfile] = useState("");
// console.log(profile);

//to get the data directly
useEffect( () => {
    axios.get('http://localhost:5000/UserProfile')
    .then(res => {
        setProfile(res.data);
        console.log(res.data);
    })
    .catch((error) => {
        console.log(error);
    })
},[]);

//to know which user
//get id from local storage
//var User = id from local storage
//map over the array
//if profile[i].userID === User
//return object
//loop over the object and render it's data


//use filter an array of objects to get the user logged in
//var User = id from local storage

{Object.entries(profile).map(([key, v]) => {
    return  <View key={key}>
            <Text>

            <Image 
            source={{
                uri: v.image,
                }} 
                />
            <Text>username: {v.username}</Text>
            <Text>email: {v.email}</Text>
            <Text>phone number: {v.phoneNumber}</Text>

            </Text>

       </View>
             
})}


}

export default Profile;

{/* <View>
<Text>
    <Image uri={person.image} />
    <Text>{person.username}</Text>
    <Text>{person.email}</Text>
    <Text>{person.phoneNumber}</Text>
</Text>
</View> */}
