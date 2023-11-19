import React from 'react'; 
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.group}>
                <Image
                    source={require('../assets/logo.png')} 
                    style={styles.profilePic}
                />
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
    profilePic: {
        width: 400,
        height: 150,
        borderRadius: 50,
        marginVertical: 0.2,
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
    },
    buttonSpacing: {
        height: 10
    },
    group: {
        alignItems: 'center',
        height: 60,
        width: 400,
        position: 'absolute',
        top: '15%',
    },
});
    
export default WelcomeScreen