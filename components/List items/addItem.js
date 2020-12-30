import React, { useState } from 'react';
import {View, Text, ImageBackground,TextInput} from 'react-native';


const AddItem = (props) => {
    const [orderData, setOrderData] = useState({  category: '', quantity: '', weight: '', description: '', price:'',image:null,status:"Pending"
});
   console.log(orderData)

    return (
        <View >
            <View>
            <Text>category:</Text>
            <TextInput
            style={{height: 40}}
            placeholder="Type here to translate!"
            onChangeText={text => setOrderData({category:text})}
            defaultValue={orderData.category}
             />
             <Text>quantity:</Text>
            <TextInput
            style={{height: 40}}
            placeholder="Type here to translate!"
            onChangeText={text => setOrderData({quantity:text})}
            defaultValue={orderData.quantity}
             />
             <Text>weight:</Text>
            <TextInput
            style={{height: 40}}
            placeholder="Type here to translate!"
            onChangeText={text => setOrderData({weight:text})}
            defaultValue={orderData.weight}
             />
             <Text>description:</Text>
            <TextInput
            style={{height: 40}}
            placeholder="Type here to translate!"
            onChangeText={text => setOrderData({description:text})}
            defaultValue={orderData.description}
             />
             <Text>price:</Text>
            <TextInput
            style={{height: 40}}
            placeholder="Type here to translate!"
            onChangeText={text => setOrderData({price:text})}
            defaultValue={orderData.price}
             />
              <Text>image:</Text>
            <TextInput
            style={{height: 40}}
            placeholder="Type here to translate!"
            onChangeText={text => setOrderData({image:text})}
            defaultValue={orderData.image}
             />
        
            </View>

        </View>
    )
}

export default AddItem;