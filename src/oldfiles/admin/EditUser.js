import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';
import {doc, updateDoc} from 'firebase/firestore';
import { db } from '../../../Firebase';
import InputSpinner from "react-native-input-spinner";

export default function EditUser(props) {

    
    const {height, width} = useWindowDimensions();
    const user = useSelector((state) => state.user.user);
    const [number, setNumber] = useState(user.numOfEvents);

    const onSavePress = async (close) => {
        const userRef = doc(db, 'Users', user.phoneNumber);
        await updateDoc(userRef, {
            numOfEvents: number,
        });
        close;
    };

    return (
        <View style={[styles.container, {height,width}]}>
            <View style={styles.message}>
                <TouchableOpacity onPress={props.onClosePress} style={styles.icon}>
                    <Icon name="close-outline" size={40} color="#E0AA3E" />
                </TouchableOpacity>
                <View style={{alignItems: 'center'}}>
                <Text style={styles.text}>שינוי מספר תורים ל{user.firstName} {user.lastName}:</Text>
                 <InputSpinner 
                    value={number}
                    style={{marginTop: 30}}
                    width={150}
                    min={1}
                    max={8}
                    skin='modern'
                    color='#fff'
                    onChange={(v) => setNumber(v)}/>
                <TouchableOpacity style={styles.button} onPress={onSavePress}>
                    <Text>שמירה</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.3)',
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
        // alignItems: 'center',
    },
    checkmark: {
        height: 80,
        width: 80,
        alignSelf: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,

    },
    secText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#E0AA3E',
        marginTop: 30,
        paddingHorizontal: 20,
        paddingVertical: 7,
        borderRadius: 10,
    },
    icon: {
        position:'absolute', 
        zIndex: 999, 
        marginTop: 5,
        marginLeft: 5,
      },
 });
