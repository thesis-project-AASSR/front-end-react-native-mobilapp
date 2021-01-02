import React, { useState}from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';
// import StyledButton from '../StyledButton';
// import styles from './style';
import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';
const EditProfile = (props) => {
console.log(props.route.params.id)
    const [editProfile, setEditProfile] = useState({username: '', email: '', phoneNumber: '', location:'sada', image:"https://firebasestorage.googleapis.com/v0/b/aboud-3f2c4.appspot.com/o/images%2F1559027161597.jpg?alt=media&token=57eaf2eb-32bb-48f2-af9f-64b96ae7effe"});
    console.log(editProfile);
        const onSubmit =  ( (e) => {
          e.preventDefault();
        axios.put(`http://192.168.1.14:5000/UsersUpdate/`+ props.route.params.id, editProfile)
        // console.log(editProfile);
        .then(res => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        })
        props.navigation.navigate('Profile');
        props.navigation.navigate('Profile');
    });
//get id from local storage to know which user profile
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
    <Button onPress={() => props.navigation.openDrawer()} title="menu"/>
    <Text>update profile</Text>
     <input  value = {editProfile.username} onChange = {(e) => setEditProfile({ ...editProfile , username : e.target.value})}/>
     <input  value = {editProfile.email} onChange = {(e) => setEditProfile({ ...editProfile , email: e.target.value})}/>
     <input  value = {editProfile.phoneNumber} onChange = {(e) => setEditProfile({ ...editProfile , phoneNumber : e.target.value})}/>
    <Button onPress= {onSubmit} title="submit"/>
 </View>
)
}
export default EditProfile;