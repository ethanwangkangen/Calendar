// Import the functions you need from the SDKs you need
import React from 'react';
import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase, get, ref, child, update, push, set } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMf2VQKOL2-VgBwwcUVBUFyLfEyDHSTeA",
  authDomain: "calendar-4d87a.firebaseapp.com",
  projectId: "calendar-4d87a",
  storageBucket: "calendar-4d87a.appspot.com",
  messagingSenderId: "686523625629",
  appId: "1:686523625629:web:ab63021add6085b02fe474",
  databaseURL: "https://calendar-4d87a-default-rtdb.asia-southeast1.firebasedatabase.app",
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

// eventId automatically generated.
// .push() creates a new child under 'events' node and generates unique key for it which is stored in 'eventRef'
// this key is stored as 'eventId"
// set method stores the event details under the generated key
export function addEvent(userId, date, eventDetails, timeStart, timeEnd) {
  const eventListRef = ref(database, `users/${userId}/calendar/${date}/events`);
  const newEventRef = push(eventListRef); // This gets a new event reference with a unique key

  // Convert eventDetails to string if necessary
  const eventDataAsString = typeof eventDetails === 'string' ? eventDetails : JSON.stringify(eventDetails);

  const eventData = {
    details: eventDataAsString,
    timeStart: timeStart,  // Time in 24-hour format, e.g., '0200' for 2:00 AM
    timeEnd: timeEnd
  };

  return set(newEventRef, eventData);
}

// Returns an object with eventIDs as keys and event details as values
export async function getEvents(userId, date) {
  const dbRef = ref(database);
  return get(child(dbRef, `users/${userId}/calendar/${date}/events`)).then((snapshot) => { // need a return here.
    if (snapshot.exists()) {
      return snapshot.val(); // This is a callback and isn't returned from getEvents. Therefore need return above.
    } else {

      return {};
    }
  }).catch((error) => {
    console.log("Can't retrieve notes for" + date);
    console.error(error);
  });
}

export const deleteEvent = (userId, date, eventId) => {
  return database.ref(`calendars/${userId}/${date}/${eventId}`).remove();
};

export const updateEvent = (userId, date, eventId, updatedEvent) => {
  return database.ref(`calendars/${userId}/${date}/${eventId}`).update(updatedEvent);
};


export function updateNotes(userId, date, notes) {
  update(ref(database, `users/${userId}/calendar/${date}`), {
    notes: notes
  });
}

export function updateAllEvents(userId, date, events) {
  return set(ref(database, `users/${userId}/calendar/${date}/events`), events)
    .then(() => {
    })
    .catch((error) => {
      console.error("Error updating events: ", error);
    });
}


export async function getNotes(userId, date) {
  const dbRef = ref(database);
  return get(child(dbRef, `users/${userId}/calendar/${date}/notes`)).then((snapshot) => { // need a return here.
    if (snapshot.exists()) {
      return snapshot.val(); // This is a callback and isn't returned from getNotes. Therefore need return above.
    } else {
      return "";
    }
  }).catch((error) => {
    console.log("Can't retrieve notes for" + date);
    console.error(error);
  });
}

export function readUserData(userId) {
  const dbRef = ref(database);
  get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}