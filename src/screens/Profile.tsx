import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import BottomTabNavigator from '../components/user/BottomTabNavigator';

export default function Home () {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <Text>Profile</Text>
            </View>
            <BottomTabNavigator />
        </SafeAreaView>
    );
  };

 const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
 });
