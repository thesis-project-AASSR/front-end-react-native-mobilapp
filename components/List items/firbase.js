import firebase from "firebase/app";
import "firebase/storage";
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBFmBh5HuVSghFmvRTwaWm9jRztxRf0j68",
    authDomain: "aboud-3f2c4.firebaseapp.com",
    databaseURL: "https://aboud-3f2c4.firebaseio.com",
    projectId: "aboud-3f2c4",
    storageBucket: "aboud-3f2c4.appspot.com",
    messagingSenderId: "554223798562",
    appId: "1:554223798562:web:dac0bc08d01bca91417d7b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default};