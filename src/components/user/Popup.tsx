import React from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
// import LottieView from 'lottie-react-native';

interface props {
    text: string;
}

export default function Popup ({text}: props) {

    const {height, width} = useWindowDimensions();
    return (
        <View style={[styles.container, {height,width}]}>
            <View style={styles.message}>
                {/* <LottieView 
                    source={require('../../assets/lottie/84338-confirmation.json')} 
                    style={styles.checkmark}
                    autoPlay
                    loop={false} /> */}
                 <Text style={styles.primaryText}>{text}</Text>
                 <Text style={styles.secText}></Text>
            </View>
        </View>
    );
  };

 const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10,
        flex: 1,
    },
    message: {
        backgroundColor: '#fff',
        width: '80%',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
    },
    checkmark: {
        height: 80,
        width: 80,
        alignSelf: 'center',
    },
    primaryText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,

    },
    secText: {
        fontSize: 16,
        marginTop: 20,
    }
 });
