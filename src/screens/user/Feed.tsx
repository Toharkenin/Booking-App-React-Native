import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
// import Logo from '../assets/logo-light.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import BottomTabNavigator from '../../components/user/BottomTabNavigator';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/NavigationTypes';
import Button from '../../components/user/ButtonCustom';
// import AppointmentList from '../components/user/AppointmentsList';


export default function Feed() {
    const [user, setUser] = useState<UserDetails>();

    interface UserDetails {
        firstName: string,
        lastName: string,
    }

    // Async Storage - get user
    useEffect(() => {
        const getUser = async () => {
            const savedUser: any = await AsyncStorage.getItem("user");
            const currentUser = JSON.parse(savedUser);
            setUser(currentUser);
        };
        getUser();
    }, []);

    //Getting user initials in case he is logged in
    // const UserInitials = ({ user }) => {
    //       if (user && user.firstName && user.lastName) {
    //         return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    //       }
    // };

    //navigation state
    type FeedNavigationProp = StackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<FeedNavigationProp>();



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}></View>
            <ScrollView>
                <View style={styles.topBox}>
                    <Icon name="bell-o" size={30} color="#fff" style={styles.notifIcon} />
                    {user ?
                        <>
                            <View style={styles.userProfile}>
                                <Text style={styles.userInitials}>{/* {UserInitials()} */}</Text>
                            </View>
                            <Text style={styles.welcomeText}>שלום {user.firstName}, שמחים שאתה כאן</Text>
                            <Button
                                onPress={() => null}
                                text="לחץ לקביעת תור" />
                        </> :
                        <>
                            <Icon name="user-circle" size={80} color="#fff" />
                            <Text style={styles.welcomeText}>שלום אורח, ברוך הבא!</Text>
                            <Button
                                onPress={() => navigation.navigate('Login')}
                                text="לחץ להתחברות" />
                        </>
                    }
                    {
                        user ?
                            <View>
                                {/* <AppointmentList /> */}
                            </View> :
                            null
                    }
                </View>
            </ScrollView>
            <BottomTabNavigator />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    topBar: {
        height: 50,
        backgroundColor: '#222222',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50,
        width: '100%',
    },
    topBox: {
        backgroundColor: "#222222",
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notifIcon: {
        position: 'relative',
        left: '40%',
        bottom: '10%',
    },
    userProfile: {
        backgroundColor: "#000",
        borderRadius: 50,
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userInitials: {
        color: 'white',
    },
    welcomeText: {
        fontSize: 18,
        color: '#fff',
        alignSelf: 'center',
    },
});
