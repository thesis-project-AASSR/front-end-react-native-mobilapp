import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';

class Main extends React.Component {
  
  state = {
    name: '',
  };



  // on change function which will set the state for the name
  onChangeText = name => this.setState({ name });

  onPress = () =>  
    this.props.navigation.navigate('Chat', { name: this.state.name });


  render() {
    return (
      <View>
        <Text style={styles.title}>
Enter your name to start interacting:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={this.onChangeText}
          value={this.state.name}
        />
         {/* this is the button will switch between screen */}
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const offset = 24;

const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
  },
});

export default Main;