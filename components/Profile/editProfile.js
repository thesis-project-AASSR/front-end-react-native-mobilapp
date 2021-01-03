import React, { useState}from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import { storage } from '../List items/firbase'
import * as ImagePicker from 'expo-image-picker';
// import StyledButton from '../StyledButton';
// import styles from './style';
import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';
const EditProfile = (props) => {
console.log(props.route.params.id)
    const [editProfile, setEditProfile] = useState({username: props.route.params.username, email: props.route.params.email, phoneNumber: props.route.params.phoneNumber, location:'Jordan-Amman', image:props.route.params.image});
    console.log(editProfile);
    //user's profile image
    const [image, setImage] = useState()
    const onChooseImagePress = async () => {
       let result = await ImagePicker.launchImageLibraryAsync({
           mediaTypes: ImagePicker.MediaTypeOptions.All,
           allowsEditing: true,
           aspect: [4, 3],
           quality: 1,
         });
         console.log(result)
       if (!result.cancelled){
         var json = JSON.stringify(result.height)
         setImage(result.uri)
           uploadImage(result.uri , json)
           .then (()=>{
      console.log ('success');
           })
           .catch((error)=>{
               console.log (error);
           });
       }
     }
           const uploadImage = async (uri,imageName)=>{
           const response = await fetch(uri);
           const blob = await response.blob();
           const  ref = storage.ref().child('images/' + imageName).put(blob);
           const saved =storage.ref("images").child(imageName).getDownloadURL().then(url => { 
            setEditProfile({...editProfile ,image:url})
             console.log(url)
                        })
            }
    const onSubmit = () =>{
      axios.put(`http://192.168.1.94:5000/UsersUpdate/`+ props.route.params.id, editProfile)
      .then(req => {
         console.log(req)
      })
      .catch((error) => {
          console.log(error);
      })
      console.log(editProfile)
      props.navigation.navigate("Profile") }
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
    <View>
    {editProfile.image && <Image source={{ uri: editProfile.image }} style={{ width: 200, height: 200 }} />}
      <Button title="Pick an image from camera roll" onPress={onChooseImagePress} />
   </View>
     <input  value = {editProfile.username} onChange = {(e) => setEditProfile({ ...editProfile , username : e.target.value})}/>
     <input  value = {editProfile.email} onChange = {(e) => setEditProfile({ ...editProfile , email: e.target.value})}/>
     <input  value = {editProfile.phoneNumber} onChange = {(e) => setEditProfile({ ...editProfile , phoneNumber : e.target.value})}/>
    <Button onPress= {onSubmit} title="submit"/>
 </View>
)
}
export default EditProfile;