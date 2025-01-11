import React, {useState, useEffect} from 'react';
import AdminNavigator from './AdminNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navigation, SignedoutNavigator } from './Navigation';
import { useDispatch } from 'react-redux';
import { login } from './redux/reducers/userSlice';
import CustomButton from '../components/user/CustomButton';


export default function AuthNavigator() {

  return (
    <>
        <CustomButton 
            text={'לקוחות'} />
        <CustomButton 
            text={'דשבורד מנהל'}/>
    </>
  );
}
