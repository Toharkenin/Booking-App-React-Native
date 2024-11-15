import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../utils/NavigationTypes';

export default function OTPVerificationScreen() {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const auth = getAuth();

  type navigationProp = StackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<navigationProp>();

  const confirmCode = async () => {
    try {
      // const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      // await signInWithCredential(auth, credential);
      setMessage("Phone authentication successful!");
      // Navigate to the main app screen or home screen
      navigation.navigate('Feed');
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>{message}</Text>
      <TextInput
        placeholder="Verification Code"
        keyboardType="number-pad"
        onChangeText={setVerificationCode}
      />
      <Button title="Confirm Code" onPress={confirmCode} />
    </View>
  );
};

