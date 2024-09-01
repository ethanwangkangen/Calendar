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


// to do:
// each function now should directly interact with local database only.
// sign up -> ask if want to sync local events to new account -> if yes, send all to firebase. do this after sign up screen.
// logging in (not previously using this acc): reset local database, pull everything from firebase
// logging in/come online (previously on this acc): push everything to firebase.
// logging out: push everything to firebsae

// Save current user ID
export const setCurrentUserId = async (userId) => { // This should be auth.currentUser.uuid?
  try {
    await AsyncStorage.setItem('currentUserId', userId);
  } catch (error) {
    console.error('Error saving user ID:', error);
  }
};

// Get current user ID
export const getCurrentUserId = async () => {
  try {
    return await AsyncStorage.getItem('currentUserId');
  } catch (error) {
    console.error('Error retrieving user ID:', error);
    return null;
  }
};

export const deleteLocalData = async () => {
  await AsyncStorage.removeItem('calendar');
}

// Function to get all calendar data from AsyncStorage
export async function getAllCalendarData() {
  try {
    const calendarDataString = await AsyncStorage.getItem('calendar');
    return calendarDataString ? JSON.parse(calendarDataString) : {};
  } catch (error) {
    console.error('Error retrieving calendar data:', error);
    throw error;
  }
}

export async function updateCalendarData(calendarData) {
  try {
    await AsyncStorage.setItem('calendar', JSON.stringify(calendarData));
  } catch (error) {
    throw error;
  }
}


export async function pushLocalDataToFirebase() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error('User is not logged in.');
    }

    const calendarData = await getAllCalendarData();
    const userCalendarRef = ref(database, `users/${userId}/calendar`);

    // Set all calendar data to Firebase
    await set(userCalendarRef, calendarData);

  } catch (error) {
    console.error('Error pushing local data to Firebase:', error);
  }
}

export async function fetchFirebaseDataToLocal() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error('User is not logged in.');
    }

    const userCalendarRef = ref(database, `users/${userId}/calendar`);
    const snapshot = await get(userCalendarRef);

    if (snapshot.exists()) {
      const firebaseCalendarData = snapshot.val();
      await updateCalendarData(firebaseCalendarData);
    } else {
    }

  } catch (error) {
    console.error('Error fetching Firebase data and updating local database:', error);
  }
}

const generateEventId = () => {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000); // Adjust range as needed
    return `${timestamp}-${randomNum}`;
}
 
export async function addEventLocal(date, eventDetails, timeStart, timeEnd) {
  const calendarData = await getAllCalendarData();
  if (!calendarData[date]) {
    calendarData[date] = { events: {}, notes: '' };
  }

  const eventId = generateEventId(); //todo
  const eventData = {id: eventId, event: eventDetails, timeStart, timeEnd}
  
  calendarData[date].events[eventId] = {
    details: eventDetails,
    timeStart: timeStart,
    timeEnd: timeEnd
  };
  await updateCalendarData(calendarData);
}

export async function getLocalEvents(date) {
  const calendarData = await getAllCalendarData();
  // Check if the date exists in calendar data
  if (!calendarData[date] || !calendarData[date].events) {
    
    return {};
  }
  const events = calendarData[date].events; 
  // Convert events object to array and sort
  const eventsArray = Object.entries(events).map(([id, event]) => ({ id, ...event }));

      // Separate events with and without startTime
      const eventsWithStartTime = eventsArray.filter(event => event.timeStart);
      const eventsWithoutStartTime = eventsArray.filter(event => !event.timeStart);

      // Client-side sorting of events with startTime (since Firebase returns them sorted by startTime)
      eventsWithStartTime.sort((a, b) => new Date(a.timeStart) - new Date(b.timeStart));

      // Combine sorted events with and without startTime
      const sortedEventsArray = [...eventsWithStartTime, ...eventsWithoutStartTime];

      // Convert sorted array back into an object with event IDs as keys
      const sortedEvents = Object.fromEntries(
        sortedEventsArray.map(event => [event.id, event])
      );
      return sortedEvents;

}

export async function updateAllLocalEvents(date, events) {
  console.log("updating local events " + events);
  const calendarData = await getAllCalendarData();
  if (!calendarData[date]) {
    calendarData[date] = { events: {}, notes: '' };
  }
  // Preserve existing notes while updating events
  const updatedData = {
    ...calendarData[date],
    events: events
  };

  calendarData[date] = updatedData;
  
  await updateCalendarData(calendarData);
  
}



export async function getLocalNotes(date) {
  const calendarData = await getAllCalendarData();
  // Check if the date exists in calendar data
  if (!calendarData[date] || !calendarData[date].notes) {
    return "";
  }
  // Check if notes exist for the specified date
  if (calendarData[date] && calendarData[date].notes) {
    console.log(calendarData[date].notes);
    return calendarData[date].notes;
  } else {
    return ''; // Return empty string if notes don't exist
  }
}



export async function updateLocalNotes(date, notes) {
  // Retrieve all calendar data
  console.log("updating local notes " + notes);
  const calendarData = await getAllCalendarData();

  if (!calendarData[date]) {
    calendarData[date] = { events: {}, notes: '' };
  }

  const updatedData = {
    ...calendarData[date],
    notes: notes
  };

  calendarData[date] = updatedData;

  // Update calendar data in AsyncStorage
  await updateCalendarData(calendarData);
  const calendarDatanew = await getAllCalendarData();

}

export function updateNotes(userId, date, notes) {
  update(ref(database, `users/${userId}/calendar/${date}`), {
    notes: notes
  });
}


//outdated functions

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
      const events = snapshot.val();
      const eventsArray = Object.entries(events).map(([id, event]) => ({ id, ...event }));

      // Separate events with and without startTime
      const eventsWithStartTime = eventsArray.filter(event => event.timeStart);
      const eventsWithoutStartTime = eventsArray.filter(event => !event.timeStart);

      // Client-side sorting of events with startTime (since Firebase returns them sorted by startTime)
      eventsWithStartTime.sort((a, b) => new Date(a.timeStart) - new Date(b.timeStart));

      // Combine sorted events with and without startTime
      const sortedEventsArray = [...eventsWithStartTime, ...eventsWithoutStartTime];

      // Convert sorted array back into an object with event IDs as keys
      const sortedEvents = Object.fromEntries(
        sortedEventsArray.map(event => [event.id, event])
      );
      return sortedEvents;

    } else {

      return {};
    }
  }).catch((error) => {
  });
}


// sets all events for that date to events (argument)
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
  });
}