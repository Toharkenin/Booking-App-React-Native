import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert} from 'react-native';
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import Loader from '../components/user/Loader';
import { doc, getDoc, setDoc, deleteDoc, deleteField, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../Firebase';
import CustomButton from '../components/user/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Communications from 'react-native-communications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';

export default function Appointments () {

    const isFocused = useIsFocused();

    const user = useSelector((state) => state.user.user);
    // const [user, setUser] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apptExists, setApptExists] = useState(false);
    const navigation = useNavigation();
    let userRef
    let formatedDate;

    userRef = doc(db, 'Users', user.phoneNumber);
    useEffect(() => { 
        if (isFocused) {
        const getAppts = async () => {
        setLoading(true);
        const unsub = onSnapshot(userRef, (docSnap) => {
            if(docSnap.data().appts.length > 0) {
                setAppointments(docSnap.data().appts);
                dateCompare(appointments);
                setApptExists(true);
            }
            else {
                setApptExists(false);
            }
            setLoading(false);
        })}
        getAppts();}
        }, [isFocused]);

    const dateCompare = async (appt) => {
        // const userRef = doc(db, 'Users', user.phoneNumber);
        let newArray = [];
        for (let i = 0; i < appt.length; i++) {
            const dateString = `${appt[i].date} ${appt[i].startTime}:00`
            const timestamp = Date.parse(dateString);
            if(timestamp > new Date()) {
                newArray.push(appointments[i]);
            }
        } 
        await updateDoc(userRef, {
            appts: newArray,
        });
    }

    const onDeleteApptPressed = (apptInfo) => {
        Alert.alert('ביטול תור קיים', 'לבטל תור זה ?',
            [{
                text: 'לא, התחרטתי'
            },
            {text: 'ביטול תור',
            onPress: () => {
                cancelAppt(apptInfo);
                removeAppt(apptInfo);
            }}])
            
    };

    const cancelAppt = async (apptInfo) => {
        //make the appt available
        const docRef = doc(db, 'Appointments', apptInfo.date);
        const docSnap = await getDoc(docRef);
        let events = []
        events = docSnap.data().appointments;
        events[apptInfo.index].available = true;
        events[apptInfo.index].userId = '';
        const del = await deleteDoc(doc(db, "Appointments", apptInfo.date));
        del;
        const update = await setDoc(doc(db, "Appointments", apptInfo.date), {
            date: apptInfo.date,
            appointments: events,
        });
        update;
    };
    
    const removeAppt = async (apptInfo) => {
        // const userRef = doc(db, 'Users', user.phoneNumber);
        const docSnap = await getDoc(userRef);
        let events = docSnap.data().appts;
        let newArray = [];
        for (let i = 0; i < events.length; i++) {
            if(apptInfo.date !== events[i].date || apptInfo.index !== events[i].index)
                newArray.push(events[i]);
        }
        await updateDoc(userRef, {
            appointments: newArray,
        });
    };

    const onPhonePressed = () => {
        Communications.phonecall('0548128044', true);
    };

    return (
        <SafeAreaView style={{backgroundColor: '#000', flex: 1}}>
            { loading ? <Loader /> :
            apptExists ? 
            <>
            <FlatList
                data={appointments}
                alwaysBounceHorizontal={false} 
                showsScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => {
                    apptExists ? formatedDate = moment(item.date).format("DD/MM/YY") : null;
                return (
                    <>
                        <View style={{flexDirection:'row', alignItems: 'center', justifyContent:'space-between',margin: 50, marginHorizontal: 20, marginBottom: 20}}>
                            <View style={styles.apptInfo}>
                                <Text style={styles.service}>{item.service}</Text>
                                <Text style={styles.date}>{formatedDate}</Text>
                                <Text style={styles.time}>{item.startTime} - {item.endTime}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}> 
                            <TouchableOpacity onPress={() => onDeleteApptPressed(item)}>
                                <Icon name="calendar-times-o" size={30} style={styles.icon}/>
                            </TouchableOpacity>
                            </View>
                        </View>
                        <Divider width={0.8} />
                    </>
            )}} /> 
            <CustomButton 
                text='יצירת קשר' 
                style= {{marginBottom: 30}}
                onPress={() => onPhonePressed()}/> 
            </> :
            <>
            <View style={{ flex:1}}>
                <Text style={styles.text}>אין תורים מוזמנים</Text>
            </View> 
            <CustomButton 
                text='+ קבעו תור חדש' 
                style= {{marginBottom: 30}}
                onPress={() => navigation.navigate('קביעת תור חדש')}/> 
            </>}
            </SafeAreaView>
    )
  }; 

 const styles = StyleSheet.create({
    text: {
        alignSelf: 'center',
        marginTop: 100,
        color: '#C0C0C0',
        fontSize: 18,
    },
    apptInfo: {
        alignItems: 'flex-start',
    },
    service: {
        fontSize: 18,
        marginVertical: 7,
        fontWeight: 'bold',
        color: 'white'
    },
    date: {
        fontSize: 17,
        marginBottom: 7,
        fontWeight: '500',
        color: 'white'
    },
    time: {
        fontSize: 16,
        color: 'white'
        // fontWeight: '600',
    },
    icon: {
        margin: 10,
        color: 'white'
    },
 });
