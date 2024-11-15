import React, { useState } from 'react';
import {View, Text, TextInput, TextInputProps, StyleSheet, I18nManager} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

interface InputProps extends TextInputProps{
    iconName: string;
    iconName2?: string;
    name: string;
    autoFocus: boolean;
};

I18nManager.forceRTL(true);
console.log(I18nManager.isRTL);

export default function Input({ iconName, iconName2, name, keyboardType, autoFocus, ...restProps }: InputProps) {

    return(
            <View style={styles.container}>
                <Icon name={iconName} size={18} color="#E0AA3E" style={styles.icon}/>
                {iconName2 && <Icon2 name={iconName2} size={18} color="#E0AA3E" style={styles.icon} />}
                <TextInput 
                    {...restProps}
                    placeholder={name}
                    style={styles.input}
                    autoCapitalize='none'
                    textAlign='right'
                    keyboardType={keyboardType}
                    autoFocus={autoFocus}
                    />
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: '70%',
        marginTop: 40,
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        fontSize: 18,
        borderBottomColor: 'gray',
        paddingVertical: 5,
    },
    icon: {
        position: 'absolute',
        left: I18nManager.isRTL ? 0 : 260,
        marginRight: I18nManager.isRTL ? 10 : 0,
    }
});
