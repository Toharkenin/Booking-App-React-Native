import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
// import FutureAppointments from '../components/user/futurAppointments';
import BottomTabNavigator from '../../components/user/BottomTabNavigator';
import { color } from 'react-native-elements/dist/helpers';

export default function Appointments() {

    const [pastAppts, setPastAppts] = useState<boolean>(false);
    const [futureAppts, setFutureAppts] = useState<boolean>(true);
    const [cancledAppts, setCancledAppts] = useState<boolean>(false);

    const pastApptsPressed = () => {
        setFutureAppts(false);
        setCancledAppts(false);
        setPastAppts(true);
    };

    const futureApptsPressed = () => {
        setFutureAppts(true);
        setCancledAppts(false);
        setPastAppts(false);
    };

    const cancledApptsPressed = () => {
        setFutureAppts(false);
        setCancledAppts(true);
        setPastAppts(false);
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={{ backgroundColor: '#fff', opacity: 1, marginTop: 15 }} onPress={() => pastApptsPressed()}>
                    <Icon2 name="list" style={[styles.icon, { color: pastAppts ? '#FFA500' : '#98989C' }]} size={25} />
                    <Text style={[styles.text, { color: pastAppts ? '#FFA500' : '#98989C' }]}>היסטוריית תורים</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#fff', opacity: 1, marginTop: 15 }} onPress={() => futureApptsPressed()}>
                    <Icon name="calendar-check-o" style={[styles.icon, { color: futureAppts ? '#FFA500' : '#98989C' }]} size={25} />
                    <Text style={[styles.text, { color: futureAppts ? '#FFA500' : '#98989C' }]}>פגישות הבאות</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#fff', opacity: 1, marginTop: 15 }} onPress={() => cancledApptsPressed()}>
                    <Icon name="calendar-times-o" style={[styles.icon, { color: cancledAppts ? '#FFA500' : '#98989C' }]} size={25} />
                    <Text style={[styles.text, { color: cancledAppts ? '#FFA500' : '#98989C' }]}>פגישות מבוטלות</Text>
                </TouchableOpacity>
                {
                    pastAppts ? <></> : futureAppts ? <></> : cancledAppts ? <></> : null
                }
            </SafeAreaView>
            <BottomTabNavigator />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    header: {

    },
    text: {
        color: '#C0C0C0',
        fontSize: 12,
        alignSelf: 'center',
    },
    icon: {
        margin: 10,
        alignSelf: 'center',
    },
});
