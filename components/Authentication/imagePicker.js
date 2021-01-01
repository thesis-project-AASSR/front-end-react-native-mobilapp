// import React from 'react';
// import { View, Text, Image, Button } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import Constants from 'expo-constants';

// export default class Photo extends React.Component {
// //   state = {
// //     photo: null,
// //   };

//   handleChoosePhoto = () => {
//     const options = {
//     //   noData: true,
//     };
//     ImagePicker.launchImageLibrary(options, (response) => {
//         console.log(ImagePicker)
//     console.log("response", response)
      
    
//     });
//   };

//   render() {
//     // const { photo } = this.state;
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         {/* {photo && (
//           <Image
//             source={{ uri: photo.uri }}
//             style={{ width: 300, height: 300 }}
//           />
//         )} */}
//         <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
//       </View>
//     );
//   }
// }

// imagepicker
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Platform, Button, Image, TextInput } from 'react-native';
import Photo from './components/Authentication/imagePicker';
import Login from './components/Authentication/login';
import Signup from './components/Authentication/signup';
import * as ImagePicker from 'expo-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Constants from 'expo-constants';
import axios from 'axios';

export default function App() {
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState({  username: '', email: '', password: '', phoneNumber: '', location: '', image: null});


const clickHandler = () => {
   
    axios.post('http://192.168.1.130:5000/signup', userData) //connected to the server port
    .then( req=> {
     console.log(req.data)
    //  localStorage.setItem('token', req.data.token)
     console.log(req.data.token)
     // setSavedUserData(savedUserData)
     console.log(userData)
     console.log("success")
    })
    .catch((error) => {
        console.log(error)
        console.log("error")
    })
 }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  return (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Signup/>
      {/* <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="save image" onPress={saveImage} /> */}
    </View>
  );
}

// export default function App() {
//   // const [name, setName] = useState('Sahar')
//   return (
//     <View style={styles.container}>
//       <Text>hello world!</Text>
      
//       {/* <Text>Mobile app</Text> */}
  
//       {/* <Login /> */}
//       {/* <Signup /> */}
//       <Photo />
     
//       <StatusBar style="auto" />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
