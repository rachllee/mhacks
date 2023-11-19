import React, { useState } from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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

const SignupScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (text) => setName(text);
    const handleEmailChange = (text) => setEmail(text);
    const handlePasswordChange = (text) => setPassword(text);

    const handleCreateAccount = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
                        
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                itemsOrdered: [],
                itemsSold: [],
                itemsInCart: [],
                itemsListed: []
            })
            navigation.navigate('LoginScreen');
        } catch (error) {
            console.error('Error creating account:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.group}>
                <Text style={styles.header}>New User</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleNameChange}
                    value={name}
                    placeholder="Name"
                    autoCapitalize="none"
                    placeholderTextColor="#bba1d2"
                />

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
                <CustomButton 
                    title="Create Account" 
                    onPress={handleCreateAccount}
                    color="#2c0e69"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#efeaff"
    },
    header: {
        fontSize: 24,
        marginBottom: 10,
        fontFamily: "AvenirNext-Bold",
        color: "#2c0e69"
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
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
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

export default SignupScreen