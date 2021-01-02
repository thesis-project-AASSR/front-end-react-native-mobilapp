// import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./navigation/sara";
import { createStackNavigator } from "@react-navigation/stack";
import LocationSearchModal from './components/Map'
import Main from './components/chat/Main'
import Chat from './components/chat/Chat'
export default function App() {
  const Stack = createStackNavigator();
  return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator mode="modal" >
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Chat" component={Chat} />
          {/* <Stack.Screen name="MapScreen" component={LocationSearchModal} /> */}
        </Stack.Navigator>
      </NavigationContainer>
  );
}