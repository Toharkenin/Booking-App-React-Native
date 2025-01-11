import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import AddUser from './AddUser';
import { db } from '../../../Firebase';
import {collection, getDoc, deleteDoc, doc, onSnapshot, setDoc, updateDoc} from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../user/Loader';
import Communications from 'react-native-communications';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { login } from '../../../redux/reducers/userSlice';
import EditUser from './EditUser';
import moment from 'moment';
import SearchUser from './SearchUser';

function UsersList ({route}) {
    const [allUsers, setAllUsers] = useState([]);
    const [usersNum, setUsersNum] = useState(0);
    const [createUserModal, setCreateUserModal] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [masterDataSource, setMasterDataSource] = useState([]);
    const dispatch = useDispatch();

    //navigation depending on route
    const edditedUsersId = route.params?.usersEditing;
    const isUserEditing = !!edditedUsersId;
    const navigation = useNavigation();

    const usersCollectionRef = collection(db, 'Users');
    const appointment = useSelector((state) => state.appointmentDetails.appointment);
    let date;
    !isUserEditing ? date = moment(appointment.date).format("DD/MM/YYYY") : null;
    
    // get list of users from firebase firestore
    useEffect(() => { 
        const getUsers = async () => {
            setLoading(true);
            const unsubscribe = onSnapshot(usersCollectionRef, (querySnapshot) => {
            const users = [];
            setUsersNum(querySnapshot.size);
            querySnapshot.forEach(documentSnapshot => {
                users.push({
                    id: documentSnapshot.id,
                    firstName: documentSnapshot.data().firstName,
                    lastName: documentSnapshot.data().lastName,
                    phoneNumber: documentSnapshot.data().phoneNumber,
                    numOfEvents: documentSnapshot.data().numOfEvents,
                    appointments: documentSnapshot.data().appointments,
                });
                setAllUsers(users);
                setMasterDataSource(users);
            })
            setLoading(false);
        })};
        getUsers(); 
    }, []);

    const searchFilter = (text) => {
        console.log(text)
        if (text) {
            const newData = allUsers.filter(user => {
                const userFirstName = user.firstName;
                const userLastName = user.lastName;
                return userFirstName.indexOf(text) > -1 || userLastName.indexOf(text) > -1;
            })
            setAllUsers(newData);
            setSearch(text);
        } else {
            setAllUsers(masterDataSource);
            setSearch(text);
        }
        
    };

    const onAddUserPressed = () => {
        setCreateUserModal(true);
    };

    // remove a user from firestore 
    const onDeleteUserPressed = (id) => {
        Alert.alert("הסרת משתמש", "האם אתה בטוח שברצונך להסיר את המשתמש?", 
        [{
            text: "לא"
        },
        {text: "כן", onPress: async () => {
            await deleteDoc(doc(db, "Users", id));
        }}])
    };

    // create new appointment for a user
    const onNewAppointmentPressed = async (id, apptsArray) => {
        const docRef = doc(db, 'Appointments', appointment.date);
        const docSnap = await getDoc(docRef);
        
        setLoading(true);
        let events = []
        events = docSnap.data().appointments;
        events[appointment.index].available = false;
        events[appointment.index].userId = id;
        const del = await deleteDoc(doc(db, "Appointments", appointment.date));
        del;
        const update = await setDoc(doc(db, "Appointments", appointment.date), {
            date: appointment.date,
            appointments: events,
        });
        update;
        createNewAppointment(id, apptsArray);
        setLoading(false);
        navigation.goBack();
    };

    const createNewAppointment = async (id, appointmentsArray) => {
        const userRef = doc(db, 'Users', id);
        let events = [];
        events = appointmentsArray;
        events.push({
            service: appointment.service,
            date: appointment.date,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
            index: appointment.index,
        }); 
        
        await updateDoc(userRef, {
            appointments: events,
        });
    };

    const onPhonePressed = (id) => {
        Communications.phonecall(id, true);
    };

    const onEditPressed = (userInfo) => {
        setEditUser(true);
        dispatch(login({
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                numOfEvents: userInfo.numOfEvents,
                phoneNumber: userInfo.phoneNumber,
            })
        );
    };


    return (
        <SafeAreaView style={{backgroundColor: '#fff', flex:1}}>
            <Modal animationType="slide"
                visible={createUserModal}
                transparent={true}> 
                   <AddUser onXPressed={() => setCreateUserModal(false)}/>
            </Modal>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                {<Text style={styles.header}>{isUserEditing ? 'משתמשים' : 'תור חדש'}</Text>}
                <Text>{usersNum}</Text>
                <TouchableOpacity onPress={onAddUserPressed}>
                    <Icon2 name="md-add-sharp" size={30} style={{marginHorizontal: 20, color: '#000'}}/>
                </TouchableOpacity>
            </View>
            {/* <Divider width={0.5} /> */}
            {isUserEditing ? null : 
                <>
                <Text style={styles.dateAndTime}>{date}</Text>
                <Text style={styles.dateAndTime}>{appointment.startTime} - {appointment.endTime}</Text>
                </>
            }
            {/* <Divider width={0.5} /> */}
            <SearchUser value={search} onChangeText={text => searchFilter(text)}/>
            <View style={styles.flatListContainer}>
            <FlatList
                data={allUsers}
                alwaysBounceHorizontal={false} 
                showsScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => (
                    <>
                        <View style={{flexDirection:'row', alignItems: 'center', justifyContent:'space-between',margin: 20,}}>
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
                                <Text style={styles.userPhone}>{item.phoneNumber}</Text>
                                <Pressable>
                                    <Text style={styles.numOfEvents}>מספר תורים: {item.numOfEvents}</Text>
                                </Pressable>
                            </View>
                            {isUserEditing ?
                            <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => onDeleteUserPressed(item.id)}>
                                <Icon name="user-minus" size={25} color='#202020' style={styles.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onEditPressed(item)}>
                                <Icon name="edit" size={25} color='#202020' style={styles.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onPhonePressed(item.id)}>
                                <Icon name="phone" size={25} color='#202020' style={styles.icon}/>
                            </TouchableOpacity>
                            </View>
                                : 
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity onPress={() => onNewAppointmentPressed(item.id, item.appointments)}>
                                        <Icon name="calendar" size={25} color='#202020' style={styles.icon}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onPhonePressed(item.id)}>
                                        <Icon name="phone" size={25} color='#202020' style={styles.icon}/>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                        <Divider width={0.7} />
                    </>
            )} />
            </View>
            {loading ? <Loader /> : null}
            {editUser ? <EditUser 
                onClosePress={() => setEditUser(false)} /> : null}
        </SafeAreaView>
    )
}

const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={{backgroundColor: '#202020', paddingVertical:10,paddingHorizontal:30, borderRadius: 30}}>
            <Text style={{color: '#fff'}}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 18,
        margin: 10,
    },
    userInfo: {
        alignItems: 'flex-start',
    },
    userName:{
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        marginBottom: 5,
    },
    dateAndTime: {
        fontSize: 16,
        padding: 7,
        alignSelf: 'center',
    },
    userPhone:{
        fontSize:  16,
        color: '#000',
        fontWeight: '500',
    },
    numOfEvents: {
        marginTop: 3,

    },
    icon: {
        marginHorizontal: 10,
    },
    flatListContainer: {
        backgroundColor: '#F5F5F5',
        flex: 1,
        marginTop: 10
    },
});

export default UsersList;