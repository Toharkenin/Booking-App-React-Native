import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';


interface Props{
    text: string;
    onPress: () => void;
}

export default function CustomButton(props:Props) {
  return (
    <Button
    onPress={props.onPress}
    containerStyle={{
        width: 200,
        marginHorizontal: 50,
        marginVertical: 10,
  }}
    type="clear"
    titleStyle={styles.text}
    title={props.text}/>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 10,
        width: '50%',
        borderRadius: 50,
        alignSelf: 'center',
    },
    text: {
        color: '#FFA500',
        fontWeight: 100,
        fontSize: 18,   
    },
})