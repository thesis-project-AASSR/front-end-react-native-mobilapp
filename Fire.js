


import firebase from 'firebase'; 
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

class Fire {
  constructor() {
    this.init();    // this init will inislize our fire base will our project 
    this.observeAuth();
  }

  // connection to the firebase database, unique credentials from Project Settings>Your apps
  init = () => {
  
      firebase.initializeApp({
        apiKey: "AIzaSyBKNb6-9YZTagBqbvxqwnnGE3UAXNi0sjw",
    authDomain: "realtime-7373d.firebaseapp.com",
    projectId: "realtime-7373d",
    storageBucket: "realtime-7373d.appspot.com",
    messagingSenderId: "634481680479",
    appId: "1:634481680479:web:d0af96f8d573be0262bbea",
    measurementId: "G-JS41HKH14D"
      });

  };

  // this will auth our user
  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  // authenticating user and allowing anonymous users   how send the msg
  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  // getting unique credentials(id) for the sender 
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  // referencing the 'messages' table in the firebase database  //ref mean the node(table) in data base 
  get ref() {
    return firebase.database().ref('messages');
  }

  // formating the message in order to be displayed nicely
  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  // getting messages to be displayed from the database   // get msg from data base
  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  // timestamp for the message
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // sending message to be stored in the database
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  // appening the message in the chat
  append = message => this.ref.push(message);

  // closing connection
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;