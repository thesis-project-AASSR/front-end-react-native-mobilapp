import React, { useEffect , useState } from 'react';
import {View, Text, ImageBackground,Image,StyleSheet} from 'react-native';

import  axios from 'axios';
const Items = () => {
// const {name,tagline,image} = props;
const [items, setItems] = useState('');
// const list =items.map((item)=>{
//     <Text>{item.category} </Text> })
console.log(items)

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
           
           
            </Text>
          
            
            </View>
        })}
        </View>
    )
}

export default Items;