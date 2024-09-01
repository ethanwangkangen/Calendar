import React, {useState, useContext} from 'react';
import { View, Text, Button , TextInput, TouchableOpacity} from 'react-native';
import styles from '../Styles.js';

import { initializeAuth, getReactNativePersistence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, deleteLocalData, getCurrentUserId, setCurrentUserId, fetchFirebaseDataToLocal,  pushLocalDataToFirebase} from '../firebaseConfig.js'; // Adjust the import path according to your project structure

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../UserContext.js';
import {getErrorMessage} from '../Utils.js';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword ] = useState();
    const { userState, setUserState } = useContext(UserContext);

    const handleLogin = async (user, email) => {
        setUserState({ user: user, email: email });
        oldId = getCurrentUserId();
        newId = user.uid;
        setCurrentUserId(newId);
        if (oldId != null && oldId != newId) { // swapping accounts
            await deleteLocalData();
            await fetchFirebaseDataToLocal();
        } else {
            await pushLocalDataToFirebase(); //push to firebase
        }
    };

    const [errorMessage, setErrorMessage] = useState('');

    

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
                    .then(async (userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        await handleLogin(user, email);
                        navigation.navigate('Calendar');
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setErrorMessage(getErrorMessage(errorCode));
                    })
    }

    return (
        <View style = {styles.loginPage}>
            
            <View style = {styles.emailBox}>
                <TextInput value={email} 
                    onChangeText={setEmail}
                    placeholder="Email:"
                    placeholderTextColor="#888"
                    style = {{width: "100%", fontFamily: 'Montserrat-Medium.ttf'}}>
                </TextInput>
            </View>

            <View style = {styles.emailBox}>
                <TextInput value={password} 
                    onChangeText={setPassword}
                    placeholder="Password:"
                    placeholderTextColor="#888"
                    secureTextEntry={true}
                    style = {{width: "100%", fontFamily: 'Montserrat-Medium.ttf'}}>
                </TextInput>
            </View>

            <View style = {{width: "100%", alignSelf: "center", padding: 5}}>
                <Text style = {{fontFamily: 'Montserrat-Medium.ttf', alignSelf: "center"}} multiline = {true}>
                    {errorMessage}
                </Text>
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: 'gainsboro',
                    padding: 3,
                    width: "20%",
                    margin: 5,
                    borderRadius: 8,
                    zIndex: 2,
                    borderColor: "black",
                    borderWidth: 1,
                    }}
                onPress={login}
            >
                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium.ttf', alignSelf: 'center' }}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    marginTop:30, 
                    backgroundColor: 'gainsboro',
                    padding: 3,
                    width: "60%",
                    margin: 5,
                    borderRadius: 8,
                    zIndex: 2,
                    borderColor: "black",
                    borderWidth: 1,
                    }}
                onPress={() => navigation.navigate('Signup')}
            >
                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium.ttf', alignSelf: 'center' }}>No account? Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor: 'gainsboro',
                    padding: 3,
                    width: "60%",
                    margin: 5,
                    borderRadius: 8,
                    zIndex: 2,
                    borderColor: "black",
                    borderWidth: 1,
                    }}
                onPress={() => navigation.navigate('Reset')}
            >
                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium.ttf', alignSelf: 'center' }}>Reset Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor: 'gainsboro',
                    padding: 3,
                    width: "60%",
                    margin: 5,
                    borderRadius: 8,
                    zIndex: 2,
                    borderColor: "black",
                    borderWidth: 1,
                    }}
                onPress={() => navigation.navigate('Calendar')}
            >
                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium.ttf', alignSelf: 'center' }}>Use without account</Text>
            </TouchableOpacity>


            
            


        </View>
    );
};



export default LoginScreen;