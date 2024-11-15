import React, { useState, useRef } from 'react';
import {View, Text, StyleSheet, Image, Pressable, 
    Keyboard, ScrollView, Alert, SafeAreaView} from 'react-native';
import Input from '../user/Input';


export default function Signin() {


    return (
        <Input 
        // value={code}
        name="קוד" 
        // iconName2="message-processing-outline"
        keyboardType="numeric"
        // onChangeText={setCode}
        // maxLength={6}
    />
    )
}