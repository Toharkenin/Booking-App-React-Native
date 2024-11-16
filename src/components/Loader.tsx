import React from 'react';
import {View, StyleSheet, ActivityIndicator, useWindowDimensions} from 'react-native';

export default function Loader () {

    // const {height, width} = useWindowDimensions();
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#C19203"/>
        </View>
    );
  };
//   style={[styles.container, {height,width}]}
 const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 10,
        flex: 1,
    },
 });
