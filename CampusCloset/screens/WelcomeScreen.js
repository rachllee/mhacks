import React from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

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
                    <CustomButton 
                    title="Create Account" 
                    onPress={() => navigation.navigate('SignupScreen')}
                    color="#2c0e69"
                />
                <View style={styles.buttonSpacing}></View>
                <CustomButton 
                    title="Log In" 
                    onPress={() => navigation.navigate('LoginScreen')}
                    color="#2c0e69"
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
        backgroundColor: '#efeaff',
    },
    title: {
        color: '#2c0e69',
        fontFamily: 'AvenirNext-Bold',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    tagline: {
        fontFamily: 'AvenirNext-Bold',
        fontSize: 16,
        color: '#b098ed',
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
    group: {
        alignItems: 'center',
        height: 60,
        width: 400,
        position: 'absolute',
        top: '15%',
    },
});
    
export default WelcomeScreen