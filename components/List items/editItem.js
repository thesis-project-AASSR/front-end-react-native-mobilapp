import React, { useEffect ,useState } from 'react';
import {View, Text, ImageBackground,Image ,TextInput,Button} from 'react-native';
import { storage } from './firbase'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const EditItems = (props) => {
    console.log(props)

    // const Stack = createStackNavigator();
   const [orderData, setOrderData] = useState({  category: props.route.params.category, 
    quantity: props.route.params.quantity,
   weight:props.route.params.weight, 
   description:props.route.params.description,
    price:props.route.params.price
,image:props.route.params.image, location:props.route.params.location,
status:props.route.params.status, user_id:props.route.params.user_id})
console.log(orderData)


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
           
          setOrderData({...orderData ,image:url})
           console.log(url)
                      })
                   
          }
        
        
const Edit = () =>{
    axios.put('http://192.168.1.14:5000/items/'+props.route.params.itemID,orderData).then(req => {
       console.log(req)
       
    })
    .catch((error) => {
        console.log(error);
    })
    console.log(orderData)
   
    props.navigation.navigate("All Items") }


    return (
        <View >

<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {orderData.image && <Image source={{ uri: orderData.image }} style={{ width: 200, height: 200 }} />}
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
        title="Edit features"
        onPress={Edit}
      />
      
            </View>

        </View>
    )
}

export default EditItems;