import React, {useState, useContext} from 'react';
import { View, Text, Button , TextInput, TouchableOpacity} from 'react-native';
import styles from '../Styles.js';

import { auth } from '../firebaseConfig.js'; // Adjust the import path according to your project structure
import { sendPasswordResetEmail, sendEmailVerification ,signInWithEmailAndPassword } from "firebase/auth";

import UserContext from '../UserContext.js';
import {getErrorMessage} from '../Utils.js';

const ResetPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const { userState, setUserState } = useContext(UserContext);


    const [errorMessage, setErrorMessage] = useState('');

    const sendReset = async (email) => {
        try {
            //console.log(auth);
          await sendPasswordResetEmail(auth, email);
          setErrorMessage('Password reset email sent to ' + email +".");
        } catch (error) {
            setErrorMessage(getErrorMessage(error.message));
        }
      };
      


    return (
        <View style = {styles.loginPage}>
            <View>
                <Text style = {{width: "100%", fontFamily: 'Montserrat-Medium.ttf'}}>
                    Enter email to reset password.
                </Text>
            </View>

            <View style = {styles.emailBox}>
                <TextInput value={email} 
                    onChangeText={setEmail}
                    placeholder="Email:"
                    placeholderTextColor="#888"
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
                    width: "40%",
                    margin: 5,
                    borderRadius: 8,
                    zIndex: 2,
                    borderColor: "black",
                    borderWidth: 1,
                    }}
                onPress={() => sendReset(email)}
            >
                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Montserrat-Medium.ttf', alignSelf: 'center' }}>Reset password</Text>
            </TouchableOpacity>


            <Button
            title="Have an account? Login"
            onPress={() => navigation.navigate('Login')}
                />

            


        </View>
    );
};



export default ResetPasswordScreen;