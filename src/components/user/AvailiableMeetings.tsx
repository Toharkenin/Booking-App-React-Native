import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'
// import LottieView from 'lottie-react-native';
import { db } from '../../../Firebase';
import { doc, getDoc } from 'firebase/firestore';
import Loader from '../Loader';
import { RootState } from '@/src/redux/store';

interface getMeetings {
    getMeeting: (startTime: string, endTime:string, index: number) => void
};

interface Event {
    startTime: string,
    endTime: string,
    index: number,
};

interface dateProp{
  date: string
}

export default function AvaliableMeetings({ getMeeting, date }: getMeetings & dateProp) {
    const [docExists, setDocExists] = useState(true);
    const [appointmentsList, setAppointmentsList] = useState<Event[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>("");
    // const date = useSelector((state: RootState) => state.appointment.appointment);
    let events:Event[] = [];
  
    const onMeetingPressed = (startTime: string, endTime:string, index: number) => {
        getMeeting(startTime, endTime, index);
    };

    useEffect(() => {
      if (date) {
        console.log(date);
        fetchData(date);
      }
    }, [date]);
      
  const fetchData = async (date: string) => {
        setLoading(true);
          const docRef = doc(db, 'Appointments', date);
          const docSnap = await getDoc(docRef);
          let counter = 0;
          if (docSnap.exists()) {
            while (counter < docSnap.data().appointments.length){
              if(docSnap.data().appointments[counter].available === true) {
                  events.push(
                      docSnap.data().appointments[counter],
                  )
              }
              counter++;
            };
            setAppointmentsList(events);
            setLoading(false);
            setDocExists(true);
          } else {
            setLoading(false);
            setDocExists(false);
          }
          if(docSnap.exists() && events.length === 0) {
              setDocExists(false);
          }
      };

    const renderAppointments = () => {
      console.log('innnnnnnn')
      return <ScrollView showsVerticalScrollIndicator={false}>
                      {appointmentsList.map((item, index) => (
                          <Pressable 
                              key={index} 
                              style={styles.btn}
                              onPress={() => onMeetingPressed(item.startTime, item.endTime, item.index)}>
                              <Text style={styles.btnText}>{item.startTime} - {item.endTime}</Text>
                          </Pressable>
                      ))}
                  </ScrollView>
    };

    
    return (  
        <View style={styles.container}>
              {loading ? <Loader/> :
                docExists ? 
                <>
                  {/* <Text style={styles.header}>לאיזה שעה תרצה לקבוע?</Text> */}
                  {renderAppointments()}
                </> :
                <>
                    <Text style={styles.header}>אין תורים להציג בתאריך זה</Text>
                    {/* <LottieView 
                        source={require('../../assets/lottie/59204-sad-look')} 
                        style={styles.emptyListedAnimation}
                        autoPlay /> */}
                </>
              }
          </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 16,
        height: 500,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      },
      icon: {
        position:'absolute', 
        zIndex: 999, 
        alignSelf: 'flex-start', 
        marginTop: 5,
        marginLeft: 5,
      }, 
      header: {
        fontSize: 18,
        fontWeight: '800',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 16,
        color: '#DEB230'
      },
      btn: {
        backgroundColor: '#DEB230',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 1,
        } ,
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      },
      btnText: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center'
      },
      emptyListedAnimation: {
          width: 80,
          height: 80,
          alignSelf: 'center',
          marginTop: 20,
      },
      loader: {
        width: 220,
        height: 220,
        alignSelf: 'center',
        marginTop: 20,
      },
});