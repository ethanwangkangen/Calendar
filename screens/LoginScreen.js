import React, {useState, useContext} from 'react';
import { View, Text, Button , TextInput,} from 'react-native';
import styles from '../Styles.js';

import { initializeAuth, getReactNativePersistence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig.js'; // Adjust the import path according to your project structure

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../UserContext.js';

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState(email);
    const [password, setPassword ] = useState(password);
    const { userState, setUserState } = useContext(UserContext);

    const handleLogin = (user, email) => {
        setUserState({ user: user, email: email });
    };

    return (
        <View style = {styles.loginPage}>

            <View style = {styles.emailBox}>
                <TextInput value={email} 
                    onChangeText={setEmail}
                    placeholder="Email:"
                    placeholderTextColor="#888"
                    style = {{width: "100%"}}>
                </TextInput>
            </View>

            <View style = {styles.emailBox}>
                <TextInput value={password} 
                    onChangeText={setPassword}
                    placeholder="password:"
                    placeholderTextColor="#888"
                    style = {{width: "100%"}}>
                </TextInput>
            </View>

            <Text>Email: {email}</Text>
            <Text>Password: {password}</Text>

            <Button
                title="Signup"
                onPress={() => createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        handleLogin(user, email);
                        navigation.navigate('Details');
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                    })}
            />
            
            <Button
                title="Login"
                onPress={() => signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        handleLogin(user, email);
                        navigation.navigate('Details');
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                    })}
            />


        </View>
    );
};



export default LoginScreen;