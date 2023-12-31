import React, { useState } from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';




const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = ({ setIsLoggedIn }) => (
    <AuthStack.Navigator initialRouteName="Welcome">
        <AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
        <AuthStack.Screen 
            name="LoginScreen" 
            children={() => <LoginScreen setIsLoggedIn={setIsLoggedIn} />}
        />
    </AuthStack.Navigator>
);

const MainNavigator = () => (
    <Tab.Navigator> 
        <Tab.Screen name="HomeScreen" component={HomeScreen}
        options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" color={color} size={size} />
            ),
        }}
        />
        <Tab.Screen name="CartScreen" component={CartScreen} 
        options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="shopping-cart" color={color} size={size} />
            ),
        }}
        />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} 
        options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="person" color={color} size={size} />
            ),
        }}
        /> 
        <Tab.Screen name="SellScreen" component={SellScreen} 
        options={{
            tabBarLabel: 'Sell',
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="add-circle" color={color} size={size} />
            ),
        }}
        />
    </Tab.Navigator>
);

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return ( 
        <NavigationContainer> 
            {isLoggedIn ? <MainNavigator /> : <AuthNavigator setIsLoggedIn={setIsLoggedIn}/> }
        </NavigationContainer>
    );
};

export default App;
