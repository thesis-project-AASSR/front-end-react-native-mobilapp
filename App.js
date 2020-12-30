
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Items from './components/List items/items'
import Adding from './components/List items/addItem'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
export default function App() {
  const Stack = createStackNavigator();
  return (

<NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="items" component={Items} />
    <Stack.Screen name="addItems" component={Adding} />
     
     
      
    </Stack.Navigator>
  </NavigationContainer>
    
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
