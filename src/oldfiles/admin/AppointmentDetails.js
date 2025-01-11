import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';
import moment from 'moment';

export default function AppointmentDetails(props) {

    const {height, width} = useWindowDimensions();
    const appointment = useSelector((state) => state.appointmentDetails.appointment);
    let date = moment(appointment.date).format("DD.MM.YYYY");
    return (
        <View style={[styles.container, {height,width}]}>
            <View style={styles.message}>
            <TouchableOpacity onPress={props.onClosePress} style={styles.icon}>
                  <Icon name="close-outline" size={40} color="#E0AA3E" />
              </TouchableOpacity>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.primaryText}>{appointment.userFirstName} {appointment.userLastName}</Text>
                 <Text style={styles.secText}>{date}</Text>
                 <Text style={styles.secText}>{appointment.startTime} - {appointment.endTime}</Text>
                <TouchableOpacity style={styles.button} onPress={props.onCanclePress}>
                    <Text>ביטול תור</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10,
        flex: 1,
    },
    message: {
        backgroundColor: '#fff',
        width: '80%',
        padding: 30,
        borderRadius: 10,
        // alignItems: 'center',
    },
    checkmark: {
        height: 80,
        width: 80,
        alignSelf: 'center',
    },
    primaryText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,

    },
    secText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#E0AA3E',
        marginTop: 30,
        paddingHorizontal: 20,
        paddingVertical: 7,
        borderRadius: 10,
    },
    icon: {
        position:'absolute', 
        zIndex: 999, 
        marginTop: 5,
        marginLeft: 5,
      },
 });
