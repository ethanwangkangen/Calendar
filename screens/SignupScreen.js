import React, {useState, useContext} from 'react';
import { View, Text, Button , TextInput, TouchableOpacity} from 'react-native';
import styles from '../Styles.js';

import { initializeAuth, getReactNativePersistence, getAuth, createUserWithEmailAndPassword, sendEmailVerification ,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig.js'; // Adjust the import path according to your project structure

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../UserContext.js';
import {getErrorMessage} from '../Utils.js';

const SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword ] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const { userState, setUserState } = useContext(UserContext);

    const handleLogin = (user, email) => {
        setUserState({ user: user, email: email });
    };

    const [errorMessage, setErrorMessage] = useState('');

    const signUp = () => {
        if (password != passwordConfirm) {
            setErrorMessage("Passwords do not match");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // Send verification email
            await sendEmailVerification(user);
            await handleLogin(user, email);
            checkEmailVerified();

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(getErrorMessage(errorCode));
        })
    }

    const checkEmailVerified = async () => {
        const user = auth.currentUser;
      
        if (user) {
          await user.reload(); // Refresh user data
          if (user.emailVerified) {
            setErrorMessage('Email is verified.');
            navigation.navigate('Calendar');
          } else {
            setErrorMessage('Verify your email and proceed to login');
          }
        }
      };
      


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

            <View style = {styles.emailBox}>
                <TextInput value={passwordConfirm} 
                    onChangeText={setPasswordConfirm}
                    placeholder="Confirm password:"
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
                onPress={signUp}
            >
                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium.ttf', alignSelf: 'center' }}>Signup</Text>
            </TouchableOpacity>


            <Button
            title="Have an account? Login"
            onPress={() => navigation.navigate('Login')}
                />

            


        </View>
    );
};



export default SignupScreen;