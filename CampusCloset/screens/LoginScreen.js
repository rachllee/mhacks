import React, { useState } from 'react'; 
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

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
            <Text style={styles.header}>Returning User</Text>
            
            <TextInput
                style={styles.input}
                onChangeText={handleEmailChange}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                onChangeText={handlePasswordChange}
                value={password}
                placeholder="Password"
                secureTextEntry
            />

            <Button 
                title="Sign In" 
                onPress={handleLogin} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '100%',
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
});

export default LoginScreen;