import MainNavigator from './MainNavigator';
import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, Pressable, 
    SafeAreaView,Linking, useWindowDimensions, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { store } from '@/src/redux/store';
import { Provider } from "react-redux";

// console.log(Input);

export default function Home() { 
    return (
        <Provider store={store}>
            <MainNavigator />
        </Provider>
    )
}