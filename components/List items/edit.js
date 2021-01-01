import React, { useState } from 'react';
import {View, Text, ImageBackground,TextInput,Button} from 'react-native';
import { storage } from './firbase'
import ImagePicker from 'react-native-image-picker'
import axios from 'axios';

const EditItems = (props) => {
   var ID = props.route.params.id
   console.log(ID)
    const [orderData, setOrderData] = useState({  category: '', quantity: '', weight: '', description: '', price:''
    ,image:null, location:localStorage.getItem('location'),
    status:"Pending", user_id:localStorage.getItem('user_id')})
   console.log(orderData)


    

const Edit = () =>{
    axios.put('http://192.168.1.36:5000/items/'+ID,orderData).then(req => {
       console.log(req)
    })
    .catch((error) => {
        console.log(error);
    })
    console.log(orderData)
}


    return (
        <View >
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
              <Text>image:</Text>
              <TextInput
            style={{height: 40}}
            placeholder="enter url"
            onChangeText={text => setOrderData({...orderData ,image:text})}
            defaultValue={orderData.image}
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