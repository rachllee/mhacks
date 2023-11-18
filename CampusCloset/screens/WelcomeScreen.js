import React from 'react'; 
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to CampusCloset!</Text>
            <Text></Text>
            <Button title="Create Account" onPress={() => navigation.navigate('SignupScreen')} />
            <Button title="Log In" onPress={() => navigation.navigate('LoginScreen')} />
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
    },
});
    
export default WelcomeScreen