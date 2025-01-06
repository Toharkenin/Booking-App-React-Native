import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Feed from '@/src/screens/user/Feed';
import Profile from '@/src/screens/user/Profile';
import Login from '@/src/screens/user/Login';
import Signup from '@/src/screens/user/Signup';
import OTPVerificationScreen from '@/src/screens/user/OTPVerificationScreen';
import Appointments from '@/src/screens/user/Appointments';
import ScheduleAppt from '@/src/screens/user/ScheduleAppt';

const MainNavigator = () => {
    const Stack = createStackNavigator();

    return (
        // <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login"
                screenOptions={{
                    animationEnabled: false,
                    gestureEnabled: false,
                }} >
                <Stack.Screen name="Feed" component={Feed} options={{
                    presentation: 'modal', headerShown: false
                }} />
                <Stack.Screen name="Profile" component={Profile} options={{
                    presentation: 'modal', headerShown: false
                }} />
                <Stack.Screen name="Appointments" component={Appointments} options={{
                    presentation: 'modal', headerShown: false
                }} />
                <Stack.Screen name="ScheduleAppt" component={ScheduleAppt} options={{
                    presentation: 'modal', headerShown: false
                }} />
                <Stack.Screen name="Login" component={Login} options={{
                    presentation: 'modal', headerShown: false
                }} />
                <Stack.Screen name="Signup" component={Signup} options={{
                    presentation: 'modal', headerShown: false
                }} />
                <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} options={{
                    presentation: 'modal', headerShown: false
                }} />
            </Stack.Navigator>
            {/* // </Provider> */}
        </NavigationContainer>
    )
}

export default MainNavigator;