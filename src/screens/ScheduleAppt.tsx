import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Pressable, SafeAreaView, I18nManager} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Animated, {
  useSharedValue, withSpring, useAnimatedStyle, withRepeat
} from 'react-native-reanimated';
import { Divider } from 'react-native-elements';
import BottomTabNavigator from '../components/user/BottomTabNavigator';
import Services from '../components/user/Services';
import UserCalendar from '../components/user/Calendar';

I18nManager.forceRTL(true);

export default function ScheduleAppt() {
    const [services, setServices] = useState<boolean>(true); 
    const [service, setService] = useState<string>(''); 
    const [date, setDate] = useState<string>(''); 
    const [schedule, setSchedule] = useState<boolean>(false); 
    const [confirm, setConfirm] = useState<boolean>(false); 
    const [popup, setPopup] = useState<boolean>(false); 

    const getService = (service:string) => {
        setService(service);
        setServices(false);
        setSchedule(true);
    };

    const getDate = (date:string) => {
        setDate(date);
        
  };

    const backToServices = () => {
        setServices(true);
        setSchedule(false);
        setConfirm(false);
    }

    return(
        <>
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Pressable onPress={() => backToServices()}>
                    <Icon name='questioncircleo' style={{color: services ? '#C19203' : '#ccc', }} size={20} />
                    <Text style={[{color: services ? '#C19203' : '#ccc', }, {marginTop: 10}]}>מה?</Text>
                </Pressable>
                <View style={styles.divider} />
                <Pressable>
                    <Icon name='clockcircleo' size={20} style={{color: schedule ? '#C19203' : '#ccc', }}/>
                    <Text style={[{color: schedule ? '#C19203' : '#ccc', }, {marginTop: 10}]}>מתי?</Text>
                </Pressable>
                <View style={styles.divider} />
                <Pressable>
                    <Icon name='checkcircleo' style={{color: confirm ? '#C19203' : '#ccc', }} size={20} />
                    <Text style={[{color: confirm ? '#C19203' : '#ccc', }, {marginTop: 10}]}>אישור</Text>
                </Pressable>
            </View>
            {
                services ? <Services getService={(e)=> getService(e)}/> : 
                schedule ? <UserCalendar getDate={(e) => getDate(e)}/> : null
            }
        </SafeAreaView>
        <BottomTabNavigator />
        </>

    )
  };


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', 
    flex: 1,
  },
  topBar: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 30,
    marginHorizontal: 30,
  },
  icon: {

  }, 
  divider: {
    height: 1,
    width: '30%',
    backgroundColor: '#ccc', // Color of the divider (customize as needed)
    marginVertical: 10, // Space around the divider
  },
  header: {
    fontSize: 18,
        fontWeight: '800',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 16,
        color: '#C19203'
  },
});