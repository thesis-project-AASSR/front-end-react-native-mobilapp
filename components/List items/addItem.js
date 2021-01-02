import React, { useState, useEffect } from 'react';
import { storage } from './firbase'

import axios from 'axios';
import { Text,Button, Image, View, Platform,TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import * as  ImagePicker from 'react-native-image-picker'
import Constants from 'expo-constants';

const AddItem = (props) => {
    const [orderData, setOrderData] = useState({  category: '', quantity: '', weight: '', description: '', price:''
    ,image:null, location:localStorage.getItem('location'),
    status:"Pending", user_id:localStorage.getItem('user_id')})
   console.log(orderData)


   
   
 //declaring an image const
const [image, setImage] = useState(null)
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
        
        orderData.image = url 
        console.log(url)
                   })
                
       }


const addItems = async () =>{
    axios.post("http://192.168.1.14:5000/items",orderData).then( res => {
       
    })
    .catch((error) => {
        console.log(error);
    })
    await props.navigation.navigate("All Items")
}


    return (
        <View >

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Pick an image from camera roll" onPress={onChooseImagePress} />
      
         </View>
            <View>
            <Text>category:</Text>
            <TextInput
            style={{height: 40}}
            placeholder="Type here your category!"
            onChangeText={text => setOrderData({...orderData ,category:text})}
            defaultValue={orderData.category}
             />
             <Text>quantity:</Text>
            <TextInput
            style={{height: 40}}
            placeholder="Type here the quantity!"
            onChangeText={text => setOrderData({...orderData ,quantity:text})}
            defaultValue={orderData.quantity}
             />
             <Text>weight:</Text>
            <TextInput
            style={{height: 40}}
            placeholder="Type here the weight!"
            onChangeText={text => setOrderData({...orderData ,weight:text})}
            defaultValue={orderData.weight}
             />
             <Text>description:</Text>
            <TextInput
            style={{height: 40}}
            placeholder="Type here the description!"
            onChangeText={text => setOrderData({...orderData ,description:text})}
            defaultValue={orderData.description}
             />
             <Text>price:</Text>
            <TextInput
            style={{height: 40}}
            placeholder="Type here the price!"
            onChangeText={text => setOrderData({...orderData ,price:text})}
            defaultValue={orderData.price}
             />
              <Button
        title="add location"
        onPress={async () => await props.navigation.navigate("MapScreen")}
      />
            <Button
        title="add items"
        onPress={addItems}
      />
            </View>

        </View>
    )
}

export default AddItem;
