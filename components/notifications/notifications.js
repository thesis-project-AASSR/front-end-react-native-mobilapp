// import Constants from 'expo-constants';
// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';
// import React, { useState, useEffect, useRef } from 'react';
// import { View, Platform } from 'react-native';
// import  axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';
// // import {acceptation } from '../../../front-end-react-website/src/components/';
// // import  axios from 'axios';
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });
// const register = async (pushToken) => {
//   const userID = await AsyncStorage.getItem('user_id')
// //   console.log(userID)
//   axios.post('http://192.168.1.94:5000/expoPushTokens', { token: pushToken, userID:userID})
// .then(res => {
//   console.log(res);
//   console.log(res.data)
// })
// .catch(error => console.log(error));
// }
// export default function Notification() {
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();
//  const updateChecker = async () => {
//   const userID = await AsyncStorage.getItem('user_id')
// //   console.log(userID)
//    axios.post('http://192.168.1.94:5000/notifications', {userID:userID})
//           .then(res => {
//             // console.log("itemID:",res.data[0]["COUNT(*)"])
//             console.log(res.data.LENG)
//                  if(res.data.LENG){
//                   // console.log(res.data)
//                   // console.log(res.data.info[0].token)
//                   //  console.log(res.data.info[0].action)
//                   sendPushNotification(res.data.info[0].token,res.data.info[0].action)
//                  }
//         })
//         .catch(error => console.log(error));
//       }
//         setInterval(updateChecker, 2000)
//   useEffect(() => {
//     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
//     // This listener is fired whenever a notification is received while the app is foregrounded
//     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//       setNotification(notification);
//     });
//     // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
//     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//       console.log(response);
//     });
//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener);
//       Notifications.removeNotificationSubscription(responseListener);
//     };
//   }, []);
//   return (
//     <View>
//     </View>
//   );
// }
// // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
// async function sendPushNotification(expoPushToken,action) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'TEST',
//     body: `your order has been ${action}`,
//     data: { data: 'goes here' },
//   };
//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }
// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log("token:",token);
//     // register(token)
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }
//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }
//   return token;
// }


















