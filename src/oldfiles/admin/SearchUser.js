import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default function SearchUser(props) {

    return (
        <SearchBar 
            placeholder="משתמשים"
            containerStyle={{
                backgroundColor: '#fff',
                borderTopColor: '#fff',
                borderBottomColor: '#fff',
            }}
            inputContainerStyle={{
                backgroundColor: "#F5F5F5",
                borderRadius: 30,
                marginHorizontal: 5
            }}
            inputStyle={{
                marginHorizontal: 5,
            }}
            onChangeText={props.onChangeText}
            value={props.value}/>
    )
};


const styles = StyleSheet.create({

 });
