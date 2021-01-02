// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Profile from './components/Profile/profile';
import Items from './components/List items/items';
import Adding from './components/List items/addItem';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
export default function App() {
  const Stack = createStackNavigator();
  return (
    <View style={styles.container}>
      {console.log("hii")}
      {/* <Text>hello worlddduuuuu!</Text> */}
      <Profile/>
      {/* <StatusBar style="auto" /> */}
<NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="items" component={Items} />
    <Stack.Screen name="addItems" component={Adding} />
    </Stack.Navigator>
  </NavigationContainer>
  </View>
  );
}
{/* <View style={styles.container}>
     <Items/>
      <StatusBar style="auto" />
    </View> */}
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