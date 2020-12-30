// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Profile from './components/Profile/profile'

export default function App() {
  return (
    <View style={styles.container}>
      {console.log("hii")}
      <Text>hello worlddduuuuu!</Text>
      
      <Profile/>
      
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// import {createAppContainer} from 'react-navigation';
// import {createDrawerNavigator} from 'react-navigation-drawer';
// import {Dimensions} from 'react-native';
// import {Feather} from '@expo/vector-icons';
// import {ProfileScreen, MessageScreen,ActivityScreen} from './screens';

// const DrawerNavigator = createDrawerNavigator({
//   ProfileScreen,
//   MessageScreen,
//   ActivityScreen
// })

// export default createAppContainer(DrawerNavigator);