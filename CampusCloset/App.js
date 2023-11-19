import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import SellScreen from './screens/SellScreen';


const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => (
    <AuthStack.Navigator initialRouteName="Welcome">
        <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
        <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
        <AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    </AuthStack.Navigator>
);

const MainNavigator = () => (
    <Tab.Navigator> 
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="CartScreen" component={CartScreen} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} /> 
        <Tab.Screen name="SellScreen" component={SellScreen} />
    </Tab.Navigator>
);

const App = () => {
    const userIsAuthenticated = true;

    return ( 
        <NavigationContainer> 
            {userIsAuthenticated ? <MainNavigator /> : <AuthNavigator /> }
        </NavigationContainer>
    );
};


export default App;
