import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
 

 
const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Public Landing Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};
 
export default LandingScreen;