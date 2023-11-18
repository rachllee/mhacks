import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';


const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => (
    <AuthStack.Navigator initialRouteName="Welcome">
        <AuthStack.Screen name="Signup" component={SignupScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    </AuthStack.Navigator>
);

const MainNavigator = () => (
    <Tab.Navigator> 
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} /> 
    </Tab.Navigator>
);

const App = () => {
    const userIsAuthenticated = false;

    return ( 
        <NavigationContainer> 
            {userIsAuthenticated ? <MainNavigator /> : <AuthNavigator /> }
        </NavigationContainer>
    );
};


export default App;
