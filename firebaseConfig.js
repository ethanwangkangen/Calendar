// Import the functions you need from the SDKs you need
import React from 'react';
import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMf2VQKOL2-VgBwwcUVBUFyLfEyDHSTeA",
  authDomain: "calendar-4d87a.firebaseapp.com",
  projectId: "calendar-4d87a",
  storageBucket: "calendar-4d87a.appspot.com",
  messagingSenderId: "686523625629",
  appId: "1:686523625629:web:ab63021add6085b02fe474"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
const database = getDatabase(app);

export { app, auth, database };

export function addUser(userId) {
  set(ref(database, 'users/' + userId), {
    calendar: {}
  });
}

export function addDay(userId, date) {
  set(ref(database, `users/${userId}/calendar/${date}`), {
    events: {},
    notes: ""
  });
}

export function addEvent(userId, date, eventId, eventDetails) {
  set(ref(database, `users/${userId}/calendar/${date}/events/${eventId}`), eventDetails);
}

export function updateNotes(userId, date, notes) {
  update(ref(database, `users/${userId}/calendar/${date}`), {
    notes: notes
  });
}

export function readUserData(userId) {
  const dbRef = ref(database);
  get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}