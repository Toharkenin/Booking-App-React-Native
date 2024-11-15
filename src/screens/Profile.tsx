import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, 
    TouchableWithoutFeedback, Keyboard} from 'react-native';
import BottomTabNavigator from '../components/user/BottomTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/user/ButtonCustom';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../utils/NavigationTypes';
import Icon from 'react-native-vector-icons/AntDesign';
import { TextInput } from 'react-native-gesture-handler';
import Popup from '../components/user/Popup';


interface UserDetails {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    dateOfBirth: string,
};

interface EditableDetailProps {
    textDetail: string;
    UserDetails: string;
  }

export default function Profile () {

    const [user, setUser] = useState<UserDetails>();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        const getUser = async () => {
            const savedUser:any = await AsyncStorage.getItem("user");
            const currentUser = JSON.parse(savedUser);
            setUser(currentUser);
        };
        getUser();
    }, []);

    type FeedNavigationProp = StackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<FeedNavigationProp>();


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.container}>
            <View style={styles.pageContainer}>
                <Text style={styles.header}>פרופיל</Text>
                { !user? <>
                <Text>אינך מחובר למערכת</Text>
                <CustomButton text='הרשמה \ התחברות' onPress={() => navigation.navigate('Login')}/>
                </> 
                :
                <>
                    <EditableDetail textDetail={user.firstName} UserDetails="שם פרטי"/>
                    <EditableDetail textDetail={user.lastName} UserDetails="שם משפחה"/>
                    <EditableDetail textDetail={user.phoneNumber} UserDetails="מספר טלפון"/>
                    <EditableDetail textDetail={user.dateOfBirth} UserDetails="תאריך לידה"/>
                </>

                }
            </View>
            <BottomTabNavigator />
        </SafeAreaView>
        </TouchableWithoutFeedback>
    );
  };


const EditableDetail: React.FC<EditableDetailProps> = ({ textDetail, UserDetails }) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState<string>(textDetail);
    const [popup, setPopup] = useState<boolean>(false);

    const handlePress = () => {
        setIsEditing(true); 
    };

    const handleBlur = () => {
        setIsEditing(false); 
        setPopup(true);
        setTimeout(() => {
            setPopup(false);
        }, 1500);
    };
    
    return (
        
        <View style={styles.container}>
            {popup ? <Popup text={ `${UserDetails} התעדכן בהצלחה`} /> : <></>}
            {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={text}
                        onChangeText={setText}
                        onBlur={handleBlur}
                        autoFocus
                        />
            ) : (
                <Text style={styles.text}>{text}</Text>
            )}
            <Text>{UserDetails}</Text>
            <TouchableOpacity onPress={handlePress}>
                <Icon name='edit' color="primary" style={styles.icon} />
            </TouchableOpacity>
        </View>
        
    )
  }

 const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
    
    },
    input: {

    },
    text: {},
    icon:{},
 });
