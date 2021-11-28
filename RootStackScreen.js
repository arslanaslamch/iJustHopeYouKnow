import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import VerificationScreen from './VerificationScreen';
import HomeScreen from './HomeScreen';
import TabsNavigation from './sections/TabNavigator';
const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
        <NavigationContainer>
            <RootStack.Navigator headerMode='none'>
                <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
                <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
                <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
                <RootStack.Screen name="VerificationScreen" component={VerificationScreen}/>
                <RootStack.Screen name="TabsNavigation" component={TabsNavigation}/>
            </RootStack.Navigator>
        </NavigationContainer>
);

export default RootStackScreen;