import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from "react-redux";
import Feed from '@/src/screens/Feed';
import Profile from '@/src/screens/Profile';
import { store } from '../src/redux/store';
import Login from '@/src/screens/Login';
import Signup from '@/src/screens/Signup';
import OTPVerificationScreen from '@/src/screens/OTPVerificationScreen';

const MainNavigator = () => {
    const Stack = createStackNavigator();

    return (
        // <Provider store={store}>
                <Stack.Navigator initialRouteName="Feed"
                    screenOptions={{
                        animationEnabled: false,
                        gestureEnabled: false,
                      }} >
                    <Stack.Screen name="Feed" component={Feed} options={{
                        presentation: 'modal', headerShown: false
                    }}/>
                    <Stack.Screen name="Profile" component={Profile} options={{
                        presentation: 'modal', headerShown: false
                    }}/>
                    {/* <Stack.Screen name="Schedule" component={Schedule} options={{
                        presentation: 'modal', headerShown: false
                    }}/>*/}
                    <Stack.Screen name="Login" component={Login} options={{
                        presentation: 'modal', headerShown: false
                    }}/>
                      <Stack.Screen name="Signup" component={Signup} options={{
                        presentation: 'modal', headerShown: false
                    }}/>
                     <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} options={{
                        presentation: 'modal', headerShown: false
                    }}/>
                </Stack.Navigator>
        // </Provider>
    )
  }

export default MainNavigator;