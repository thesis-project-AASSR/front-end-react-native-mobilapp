import React, { useState, useEffect } from 'react';
import { storage } from './firbase'

import axios from 'axios';
import { Text,Button, Image, View, Platform,TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

const AddItem = (props) => {
    const [orderData, setOrderData] = useState({  category: '', quantity: '', weight: '', description: '', price:''
    ,image:null, location:localStorage.getItem('location'),
    status:"Pending", user_id:localStorage.getItem('user_id')})
   console.log(orderData)


  //  const [image, setImage] = useState(null)
   
  //  useEffect(() => {
  //    (async () => {
  //      if (Platform.OS !== 'web') {
  //        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //        if (status !== 'granted') {
  //          alert('Sorry, we need camera roll permissions to make this work!');
  //        }
  //      }
  //    })();
  //  }, []);



  //  const pickImage = async () => {
  //    let result = await ImagePicker.launchImageLibraryAsync({
  //      mediaTypes: ImagePicker.MediaTypeOptions.All,
  //      allowsEditing: true,
  //      aspect: [4, 3],
  //      quality: 1,
  //    });
  //    console.log(result);
  //    if (!result.cancelled) {
  //     setImage(result.uri);
   
  //    }
  //  };

  //  const upload = ()=>{
  //    orderData.image= image
  //  }


//   const uploadToStorage = (image) => {
//     getFileBlob(image, blob => {
//       storage().ref().put(blob).then(function(snapshot) {
//           console.log('Uploaded a blob or file!');
//        })
//    })
// }


   
  //  const imageUpload  = async (e) => {
    
  //   const imageLink = storage.ref(`images/`).put(image)
  //   imageLink.on(
  //      "state_changed",
  //      snapshot => {},
  //      error => {
  //        console.log(error)
  //      },
  //      () => {
  //        storage
  //        .ref(`images/`)
  //        .child(image)
  //        .getDownloadURL()
  //        .then(url => {
  //         orderData.image = url
  //          console.log(url)
  //        })
  //      })
  // }

const addItems = () =>{
    axios.post("http://192.168.1.36:5000/items",orderData).then( res => {
       
    })
    .catch((error) => {
        console.log(error);
    })
   
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
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     
     
     
    </View>
          
            <Button
        title="add items"
        onPress={addItems}
      />
            </View>

        </View>
    )
}

export default AddItem;




