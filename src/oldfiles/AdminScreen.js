//toDo: add onSnapshot to everything

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Alert, Linking} from 'react-native';
import { Agenda, CalendarProvider  } from 'react-native-calendars';
import FooterMenu from '../components/admin/FooterMenu'; 
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Services from '../components/user/Services';
import Loader from '../components/user/Loader';
import { db } from '../../Firebase';
import { getDoc, doc, collection, onSnapshot, 
    setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { set } from '../../redux/reducers/appointmentSlice';
import AppointmentDetails from '../components/admin/AppointmentDetails';
import moment from 'moment';

export default function AdminScreen() {
    //hook for appointments in the calendar
    const [appointments, setAppointments] = useState({});
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [service, setService] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [chooseService, setChooseService] = useState(false);
    const [apptDetails, setApptDetails] = useState({
        startTime: '',
        endTime: '',
        available: '',
        index: '',
        date: '',
    });

    const dispatch = useDispatch();
    const appointment = useSelector((state) => state.appointmentDetails.appointment);
    let dateFormated;
    appointment ? dateFormated = moment(appointment.date).format("DD/MM/YY") : null;

    useEffect(() => {
        const getAppts = async () => {
            setLoading(true);
            const collectionRef = collection(db, "Appointments");
            // const querySnapshot = await getDocs(collectionRef);
            onSnapshot(collectionRef, (querySnapshot) => {
                querySnapshot.forEach(doc => {
                let events = doc.data().appointments;
                let date = doc.id;
                setAppointments((prev) => ({...prev, [date]: events}));
            })});
            setLoading(false);
        };
        getAppts();
    }, []);

    const onCreateApptPressed = (start, end, available, index, date) => {
        setChooseService(true);
        setApptDetails((prevState) => ({...prevState, ['startTime']:start}));
        setApptDetails((prevState) => ({...prevState, ['endTime']:end}));
        setApptDetails((prevState) => ({...prevState, ['available']:available}));
        setApptDetails((prevState) => ({...prevState, ['index']:index}));
        setApptDetails((prevState) => ({...prevState, ['date']:date}));
    };


    const onExistingApptPresed = async (start, end, available, index, userId, date) => {
        const docRef = doc(db, 'Users', userId);
        const docSnap = await getDoc(docRef);
        dispatch(set({
            startTime: start,
            endTime: end,
            available: available,
            date: date,
            index: index,
            userId: docSnap.data().phoneNumber,
            userFirstName: docSnap.data().firstName,
            userLastName: docSnap.data().lastName,
        }))
        setShowPopup(true);
    };

    const getService = (service) => {
        setService(service);
        setChooseService(false);
        dispatch(set({
            startTime: apptDetails.startTime,
            endTime: apptDetails.endTime,
            available: apptDetails.available,
            date: apptDetails.date,
            index: apptDetails.index,
            service: service,
        }))
        navigation.navigate("משתמשים");
    };

    const onCancleApptPress = () => {
            Alert.alert('ביטול תור קיים', 'לבטל תור זה ?',
                [{
                    text: 'לא, התחרטתי'
                },
                {text: 'ביטול תור',
                onPress: () => {
                    cancelAppt();
                    removeAppt();
                }},
                {
                text: 'ביטול תור ושליחת הודעה',
                onPress: () => {
                    cancelAppt();
                    removeAppt();
                    Linking.openURL(`whatsapp://send?text=היי ${appointment.userFirstName} נמחק לך תור בתאריך ${dateFormated} &phone=+972${appointment.userId}`);
                }
                }])
    };

    const cancelAppt = async () => {
        //make the appt available
        const docRef = doc(db, 'Appointments', appointment.date);
        const docSnap = await getDoc(docRef);
        let events = []
        events = docSnap.data().appointments;
        events[appointment.index].available = true;
        events[appointment.index].userId = '';
        const del = await deleteDoc(doc(db, "Appointments", appointment.date));
        del;
        const update = await setDoc(doc(db, "Appointments", appointment.date), {
            date: appointment.date,
            appointments: events,
        });
        update;
        setShowPopup(false);
    };
    
    const removeAppt = async () => {
        const userRef = doc(db, 'Users', appointment.userId);
        const docSnap = await getDoc(userRef);
        let events = docSnap.data().appointments;
        let newArray = [];
        for (let i = 0; i < events.length; i++) {
            if(appointment.date !== events[i].date || appointment.index !== events[i].index)
                newArray.push(events[i]);
        }
        await updateDoc(userRef, {
            appointments: newArray,
        });
        setShowPopup(false);
    };

    const renderItem = (item) => {
        return (
            <>
                <Pressable style={styles.item} >
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {item.available === true ? 
                        <>
                        <Pressable onPress={() => onCreateApptPressed(item.startTime, item.endTime, item.available, item.index, item.date)}>
                            <Icon name="md-add-sharp" size={30} style={{marginHorizontal: 10, color: '#000'}}/>
                        </Pressable>
                        <Text style={styles.timeText}>{item.startTime} - {item.endTime}</Text>
                        </> : !item.available && item.userId ?
                        <Pressable onPress={() => onExistingApptPresed(item.startTime, item.endTime, item.available, item.index, item.userId, item.date)}
                            style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{backgroundColor: "#E0AA3E", height:40, width:40, borderRadius: 30, margin: 10, justifyContent: 'center'}}>
                                <Icon name="person-sharp" size={25} style={{color: '#fff', alignSelf: 'center'}}/>    
                            </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.timeText}>{item.startTime} - {item.endTime}</Text>
                            <Text style={{marginTop: 7, fontSize: 14}}>{item.userId}</Text>
                        </View>
                        </Pressable>
                        : 
                        <>
                        <View style={{backgroundColor: "#E0AA3E", height:40, width:40, borderRadius: 30, margin: 10, justifyContent: 'center'}}>
                            <Icon2 name="block" size={30} color="#000" style={{ alignSelf: 'center'}}/>    
                        </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.timeText}>{item.startTime} - {item.endTime}</Text>
                        <Text style={{marginTop: 7, fontSize: 14}}>{item.userId}</Text>
                    </View>
                </>
                        }
                    </View>
                </Pressable>
            </>
        );
    };

    

    return (
        <SafeAreaView style={styles.container}>
            {loading ? <Loader /> : null}
            {showPopup? <AppointmentDetails
                            onClosePress={() => setShowPopup(false)}
                            onCanclePress={onCancleApptPress}
                            /> 
            : null }
            <CalendarProvider date="">
            <Agenda
                items={appointments}
                refreshControl={null}
                showClosingKnob={true}
                refreshing={false}
                selected={new Date()}
                renderItem={renderItem}
                renderEmptyData={() => {
                    return <Text style={{alignSelf: 'center', marginTop: 100, color: 'silver'}}>אין תורים בתאריך זה</Text>;
                }}
                // renderDay={renderDay}
                pastScrollRange={30}
                futureScrollRange={30}
                scrollEnabled={true}
                onDayPress={(date) => setDate(date)}
                theme={{
                    agendaDayTextColor: '#E0AA3E',
                    agendaDayNumColor: '#E0AA3E',
                    agendaTodayColor: '#E0AA3E',
                    agendaKnobColor: '#E0AA3E',
                    selectedDayBackgroundColor: '#E0AA3E',
                    dotColor: '#E0AA3E',
                    todayTextColor: '#E0AA3E',
                }}
            />
            </CalendarProvider>
                {chooseService ? <Services 
                    getService={(e)=> getService(e)}
                    onXPressed={() =>setChooseService(false)}/> : null}
            <FooterMenu />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        borderRadius: 5,
        paddingVertical: 10,
        marginRight: 10,
        marginTop: 20,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        elevation: 10, 
    },
    nameText: {
        fontSize: 16,
    },
    timeText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        alignSelf: 'center',
    },
    serviceText: {
        fontSize: 16,
    },
    icon: {
        alignSelf: 'center',
        margin: 10,
    },
});