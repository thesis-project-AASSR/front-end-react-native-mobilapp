import React, { useEffect , useState } from 'react';
import {View, Text, ImageBackground,Image,StyleSheet,Button, useWindowDimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  axios from 'axios';
const Items = (props) => {
  console.log(props)
// const {name,tagline,image} = props;
const [items, setItems] = useState('');
localStorage.setItem('userid',11)
localStorage.setItem('location','amman')

const Delete = (ID) => {
  
  axios.delete("http://127.0.0.1:5000/delete/"+ID).then( res => {
   console.log(res.data) 
   })
  .catch((error) => {
    console.log(error);
})
    props.navigation.navigate('items')
}


useEffect( () => {
    
    axios.get('http://192.168.1.13:5000/ItemsList')   
    .then( res => {
        // console.log (res.data)
        setItems(res.data)
    })
    .catch((error) => {
        console.log(error);
    })
   
  }, []);


//getting all the items 
useEffect(  () => {
      axios.get('http://127.0.0.1:5000/ItemsList')   
    .then( res => {
        // console.log (res.data)
        setItems(res.data)
    })
    .catch((error) => {
        console.log(error);
    })
   
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
             
            
        {Object.entries(items).map(([key,v])=>{
            return <View key={key}>
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
           
           
            <Button
        title="Go to add items"
        onPress={() => props.navigation.navigate('addItems')}
      />
      <Button
        title="Edit"
        onPress={() => props.navigation.navigate('Edit', {itemID:v.itemID ,image :v.image,category :v.category,
          quantity :v.quantity,weight:v.weight,description:v.description, price:v.price,user_id:v.user_id,
          status:v.status , location: v.location,


        })}
      />
              <Button
        title="Delete"
        onPress={() => {Delete(v.itemID)}}
      />
              
              

            </Text>
          
            
            </View>
        })}
        </View>
    )
}

export default Items;