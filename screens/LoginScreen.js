import React, {useState, useContext} from 'react';
import { View, Text, Button , TextInput, TouchableOpacity} from 'react-native';
import styles from '../Styles.js';

import { initializeAuth, getReactNativePersistence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig.js'; // Adjust the import path according to your project structure

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../UserContext.js';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword ] = useState();
    const { userState, setUserState } = useContext(UserContext);

    const handleLogin = (user, email) => {
        setUserState({ user: user, email: email });
    };

    const [errorMessage, setErrorMessage] = useState('');

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
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
            setErrorMessage(errorMessage);
        })
    }

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
                        setErrorMessage(errorMessage);
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
                    placeholder="password:"
                    placeholderTextColor="#888"
                    secureTextEntry={true}
                    style = {{width: "100%", fontFamily: 'Montserrat-Medium.ttf'}}>
                </TextInput>
            </View>

            <View>
                <Text style = {{width: "100%", fontFamily: 'Montserrat-Medium.ttf'}}>
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
                    backgroundColor: 'gainsboro',
                    padding: 3,
                    width: "20%",
                    margin: 5,
                    borderRadius: 8,
                    zIndex: 2,
                    borderColor: "black",
                    borderWidth: 1,
                    }}
                onPress={signUp}
            >
                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium.ttf', alignSelf: 'center' }}>Signup</Text>
            </TouchableOpacity>


        </View>
    );
};



export default LoginScreen;