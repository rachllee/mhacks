import React, { useState } from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const CustomButton = ({ title, onPress, color }) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[styles.button, { backgroundColor: color }]}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const LoginScreen = ({ setIsLoggedIn }) => {
    const [currentUser, setCurrentUser] = useState(null);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (text) => setEmail(text);
    const handlePasswordChange = (text) => setPassword(text);

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
        
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.data() != undefined) {
                setCurrentUser(userCredential.user);
                setIsLoggedIn(true);
            } else {
                console.log("User does not exist in Firestore");
                Alert.alert(
                    "Login Failed",
                    "Couldn't log in with the provided credentials.",
                    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                    { cancelable: false }
                );
            }
        } catch (error) {
            console.error("Error logging in: ", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.group}>
                <Text style={styles.header}>Returning User</Text>
                
                <TextInput
                    style={styles.input}
                    onChangeText={handleEmailChange}
                    value={email}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#bba1d2"
                />

                <TextInput
                    style={styles.input}
                    onChangeText={handlePasswordChange}
                    value={password}
                    placeholder="Password"
                    secureTextEntry
                    placeholderTextColor="#bba1d2"
                />
                <View style={styles.buttonSpacing}></View>
                <View style={styles.buttonContainer}>
                    <CustomButton 
                        title="Log In" 
                        onPress={handleLogin} 
                        color="#2c0e69"
                    />
                </View>
                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#efeaff',
    },
    header: {
        color: '#2c0e69',
        fontFamily: 'AvenirNext-Bold',
        fontSize: 24,
        marginBottom: 10,
    },
    input: {
        color: '#2c0e69',
        fontFamily: 'AvenirNext-Bold',
        height: 40,
        width: '100%',
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    group: {
        alignItems: 'center',
        height: 60,
        width: 300,
        position: 'absolute',
        top: '20%',
    },
    buttonContainer: {
        fontFamily: 'AvenirNext-Bold',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '125%'
    },
    buttonText: {
        color: '#efeaff',
        fontSize: 16,
        fontFamily: 'AvenirNext-Bold', 
    },
    buttonSpacing: {
        height: 10
    },
});

export default LoginScreen;