import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  Button,
  useWindowDimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
const Items = (props) => {
  const [items, setItems] = useState("");
  const [user, setUser] = useState("");
  // localStorage.setItem('location','amman')
  const Delete = (ID) => {
    axios
      .delete("http://192.168.1.94:5000/delete/" + ID)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get("http://192.168.1.94:5000/ItemsList")
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [items]);
  useEffect(async () => {
    try {
      const value = await AsyncStorage.getItem("user_id");
      setUser(value);
      if (value !== null) {
        // We have data!!
      }
    } catch (error) {
      // Error retrieving data
    }
  }, []);
  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });
  return (
    <View>
      {Object.entries(items)
        .filter(([key, y]) => y.user_id == user)
        .map(([key, v]) => {
          return (
            <View key={key}>
              <Text>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: v.image,
                  }}
                />
                <Text>category : {v.category}</Text>
                <Text> quantity: {v.quantity}</Text>
                <Text> weight: {v.weight}</Text>
                <Text> description: {v.description}</Text>
                <Text> location: {v.location}</Text>
                
                <Text> price: {v.price}</Text>
                <Button
                  title="Edit"
                  onPress={() =>
                    props.navigation.navigate("Edit", {
                      itemID: v.itemID,
                      image: v.image,
                      category: v.category,
                      quantity: v.quantity,
                      weight: v.weight,
                      description: v.description,
                      price: v.price,
                      user_id: v.user_id,
                      status: v.status,
                      location: v.location,
                    })
                  }
                />
                <Button
                  title="Delete"
                  onPress={() => {
                    Delete(v.itemID);
                  }}
                />
              </Text>
            </View>
          );
        })}
      <Button
        title="Go to add items"
        onPress={() => props.navigation.navigate("Add new item")}
      />
    </View>
  );
};
export default Items;