import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
<<<<<<< HEAD
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
=======
import CartScreen from './screens/CartScreen'
import ProfileScreen from './screens/ProfileScreen'
>>>>>>> 25b58329ab608f22c5ff2647afcd5d54934c2fcb


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
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="CartScreen" component={CartScreen} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} /> 
    </Tab.Navigator>
);

const App = () => {
<<<<<<< HEAD
    const [isLoggedIn, setIsLoggedIn] = useState(false);
=======
    const userIsAuthenticated = true;
>>>>>>> 25b58329ab608f22c5ff2647afcd5d54934c2fcb

    return ( 
        <NavigationContainer> 
            {isLoggedIn ? <MainNavigator /> : <AuthNavigator setIsLoggedIn={setIsLoggedIn}/> }
        </NavigationContainer>
    );
};

export default App;
