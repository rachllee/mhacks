import React from 'react'; 
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to CampusCloset!</Text>
            <Text style={styles.tagline}>Style on a Budget, Right on Campus</Text>
            <View style={styles.buttonContainer}>
                <Button 
                    title="Create Account" 
                    onPress={() => navigation.navigate('SignupScreen')} 
                    color="#5c6bc0"
                />
                <View style={styles.buttonSpacing}></View>
                <Button 
                    title="Log In" 
                    onPress={() => navigation.navigate('LoginScreen')} 
                    color="#5c6bc0"
                />
            </View>
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    tagline: {
        fontSize: 16,
        color: '#616161',
        marginBottom: 20,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
    },
    buttonSpacing: {
        height: 10
    },
});
    
export default WelcomeScreen