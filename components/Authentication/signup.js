import React from 'react';
import {StyleSheet, View, Text, ImageBackground, Button, TextInput, Image} from 'react-native';
import {useState} from 'react';
import * as firebase from 'firebase';
import {launchImageLibraryAsync} from 'react-native-image-picker';
import { storage} from '../List items/firbase';
// import firebase from '../List items/firbase';
// import StyledButton from '../StyledButton';
// import styles from './style';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';


const Signup = (props) => {
// // const {name,tagline,image} = props;
const [userData, setUserData] = useState({  username: '', email: '', password: '', phoneNumber: '', location: '', image: null});
//declaring an image const
const [image, setImage] = useState(null)

////////////////
  // choosing the image 
const onChooseImagePress = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result)
    //checking the uploaded image
  if (!result.cancelled){
    //setting the image name
    var json = JSON.stringify(result.height)
    setImage(result.uri)
    //calling the image function 
      uploadImage(result.uri , json)
      .then (()=>{
     console.log ('success');
      })
      .catch((error)=>{
     console.log (error);
      });
  }
}
        //image save in firebase 
      const uploadImage = async (uri,imageName)=>{
      const response = await fetch(uri);
      const blob = await response.blob();
      const  ref = storage.ref().child('images/' + imageName).put(blob);
      //retreive the image from the firebase
      const saved =storage.ref("images").child(imageName).getDownloadURL().then(url => { 
        userData.image = url 
        console.log(url)
                   })
       }

const clickHandler = () => {
   
    axios.post('http://192.168.8.103:5000/signup', userData) //connected to the server port
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
    props.navigation.navigate('Sign In')
 }

////////////////////
    return (
        <View >
            
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Pick an image from camera roll" onPress={onChooseImagePress} />
</View>
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

            {/* <Text>Image</Text>
            <TextInput 
            style={styles.input}
            placeholder=''
            onChangeText={(image) =>  setUserData({...userData, image: image})}/>
            <Button title ="upload image" onPress= {imageUpload} /> */}
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
