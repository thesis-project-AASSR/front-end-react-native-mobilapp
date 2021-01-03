import React, { useState, useEffect } from 'react';
import { storage } from '../../Fire'
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { Text,Button, Image, View, Platform,TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import * as  ImagePicker from 'react-native-image-picker'
import Constants from 'expo-constants';
var CalPrice=0
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
   
    //checking the uploaded image
  if (!result.cancelled){
    console.log(result)
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
       
                   })
                
       }


const addItems = () =>{
    axios.post("http://192.168.1.36:5000/items",orderData).then( res => {
      
    })
    .catch((error) => {
        console.log(error);
    })


//  props.navigation.navigate("All Items")
}

const prices = {Iron:0.25,wood:0.20,glass:0.15,plastic:0.10}

var kind= orderData.category
const calculatePrice = prices[kind]
CalPrice= calculatePrice *  orderData.quantity * orderData.weight

    return (
        <View >

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Pick an image from camera roll" onPress={onChooseImagePress} />
      
         </View>
            <View>
            <RNPickerSelect
            onValueChange={(value) => setOrderData({...orderData ,category:value})}
            items={[
                { label: "Iron", value: "Iron" },
                { label: "wood", value: "wood" },
                { label: "glass", value:"glass" },
                { label: "plastic", value: "plastic" },
            ]}
        />
            
             <Text>quantity:</Text>
            <TextInput
            style={{height: 40}}
            placeholder="Type here the quantity!"
            onChangeText={text => setOrderData({...orderData ,quantity:text, price:CalPrice})}
        
             />
             <Text>weight:</Text>
            <TextInput
            style={{height: 40}}
            placeholder="Type here the weight!"
            onChangeText={text => setOrderData({...orderData ,weight:text, price:CalPrice})}
           
             />
             <Text>description:</Text>
            <TextInput
            style={{height: 40}}
            placeholder="Type here the description!"
            onChangeText={text => setOrderData({...orderData ,description:text})}
           
             />
             <Text>price:</Text>
            <TextInput
            style={{height: 40}}
            placeholder={CalPrice}
         
           
             />
              <Button
        title="add location"
        onPress={ () => props.navigation.navigate("MapScreen")}
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
