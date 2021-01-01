import React from 'react';
import {StyleSheet, View, Text, ImageBackground, Button, TextInput} from 'react-native';
import {useState} from 'react';
// import firebase from 'firebase';
// import * as firebase from 'firebase';
// import { storage } from './firbase';
// import StyledButton from '../StyledButton';
// import styles from './style';
import axios from 'axios';

const Signup = (props) => {
// // const {name,tagline,image} = props;
const [userData, setUserData] = useState({  username: '', email: '', password: '', phoneNumber: '', location: '', image: null});
// const [image, setUserData] = useState()


const clickHandler = () => {
   
    axios.post('http://localhost:5000/signup', userData) //connected to the server port
    .then( req=> {
     console.log(req.data)
    //  localStorage.setItem('token', req.data.token)
     console.log(req.data.token)
     // setSavedUserData(savedUserData)
     console.log(userData)
     console.log("success")
    })
    .catch((error) => {
        console.log(error)
        console.log("error")
    })
 }


///////////////////////////
// function handleChangeImage(e){
//     e.preventDefault();
//       setUserImage( e.target.files[0])      
//     }

//     const imageUpload  = (e) => {
//         const imageLink = storage.ref(`images/${image.name}`).put(image)
//         imageLink.on(
//            "state_changed",
//            snapshot => {},
//            error => {
//              console.log(error)
//            },
//            () => {
             
//              storage
//              .ref("images")
//              .child(image.name)
//              .getDownloadURL()
//              .then(url => {
     
//               userData.image = url
//                console.log(url)
//              })
//            })
        
//       }
////////////////////
    return (
        <View >
            
            <Text style = {styles.margin}>Sign up</Text>
            <View style = {styles.buttonContainer}>
            <Text>Username</Text>
            <TextInput 
            style={styles.input}
            placeholder=''
            onChangeText={(username) => setUserData({...userData, username: username})}/>

            <Text>Email</Text>
            <TextInput 
            style={styles.input}
            placeholder='example@xxxmail.com'
            onChangeText={(email) =>  setUserData({...userData, email: email})}/>

            <Text>Password</Text>
            <TextInput 
            // keyboardType='default'
            style={styles.input}
            placeholder='e.g .!@#123Aa'
            onChangeText={(password) =>  setUserData({...userData, password: password})}/>

            <Text>Phone Number</Text>
            <TextInput 
            style={styles.input}
            placeholder='0123456789'
            onChangeText={(phoneNumber) =>  setUserData({...userData, phoneNumber: phoneNumber})}/>

            <Text>Image</Text>
            <TextInput 
            style={styles.input}
            placeholder=''
            onChangeText={(image) =>  setUserData({...userData, image: image})}/>
            {/* <Button title ="upload image" onPress= {imageUpload} /> */}
            <View style = {styles.buttonContainer}>
            <Button title = "signup" onPress =  {clickHandler}/>
                </View>
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

export default Signup;
