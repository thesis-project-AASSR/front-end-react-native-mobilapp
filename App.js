
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Items from './components/List items/items'
import Adding from './components/List items/addItem'
import Edit from './components/List items/edit'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to items"
        onPress={() => navigation.navigate('items')}
      />
    </View>
  );
}



export default function App() {
  const Stack = createStackNavigator();
  return (

<NavigationContainer>
    <Stack.Navigator>     
      
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="addItems" component={Adding} /> 
      <Stack.Screen name="items" component={Items} />
      <Stack.Screen name="Edit" component={Edit} />

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
