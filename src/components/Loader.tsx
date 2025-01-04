import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default function Loader() {

    return (
        <View style={styles.container}>
            <ActivityIndicator size="small" color="#0000ff" />
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
