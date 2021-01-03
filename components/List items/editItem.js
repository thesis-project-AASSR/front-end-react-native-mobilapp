import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Button,
} from "react-native";
import { storage } from "../../Fire";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
var CalPrice = 0;
const EditItems = (props) => {
  // const Stack = createStackNavigator();
  const [orderData, setOrderData] = useState({
    category: props.route.params.category,
    quantity: props.route.params.quantity,
    weight: props.route.params.weight,
    description: props.route.params.description,
    price: props.route.params.price,
    image: props.route.params.image,
    location: props.route.params.location,
    status: props.route.params.status,
    user_id: props.route.params.user_id,
  });
  const [image, setImage] = useState();
  
 


  const Edit = () => {
    axios
      .put(
        "http://192.168.1.94:5000/items/" + props.route.params.itemID,
        orderData
      )
      .then((req) => {})
      .catch((error) => {
        console.log(error);
      });
    props.navigation.navigate("All Items");
  };


  const prices = { Iron: 0.25, wood: 0.2, glass: 0.15, plastic: 0.1 };
  var kind = orderData.category;
  const calculatePrice = prices[kind];
  CalPrice = calculatePrice * orderData.quantity * orderData.weight;

  return (
    <View>
      {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {orderData.image && <Image source={{ uri: orderData.image }} style={{ width: 200, height: 200 }} />}
      <Button title="Pick an image from camera roll" onPress={onChooseImagePress} /> */}
      {/* </View> */}
      <View>
        <Text>category:</Text>
        <RNPickerSelect
          onValueChange={(value) =>
            setOrderData({ ...orderData, category: value })
          }
          items={[
            { label: "Iron", value: "Iron" },
            { label: "wood", value: "wood" },
            { label: "glass", value: "glass" },
            { label: "plastic", value: "plastic" },
          ]}
        />
        <Text>quantity:</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here the quantity!"
          onChangeText={(text) =>
            setOrderData({ ...orderData, quantity: text, price: CalPrice })
          }
          defaultValue={orderData.quantity}
        />
        <Text>weight:</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here the weight!"
          onChangeText={(text) => setOrderData({ ...orderData, weight: text, price: CalPrice })}
          defaultValue={orderData.weight}
        />
        <Text>description:</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here the description!"
          onChangeText={(text) =>
            setOrderData({ ...orderData, description: text })
          }
          defaultValue={orderData.description}
        />
        <Text>price:</Text>
        {CalPrice}
        <Button title="Edit features" onPress={Edit} />
      </View>
    </View>
  );
};
export default EditItems;