import React, { useState } from 'react';
import { Text, ScrollView, View, StyleSheet, TextInput, Alert, SafeAreaView, 
   Platform, FlatList} from 'react-native';
import { Button } from 'react-native-elements';
import CustomButton from '../user/CustomButton';
import HeaderTabs from './HeaderTabs';
import DateTimePicker from '@react-native-community/datetimepicker'
import Popup from '../user/Popup';
import { useNavigation } from '@react-navigation/native';
import AdminCalendar from './AdminCalendar';
import { createAppointmentsList } from '../../util/firebaseApptsSettings';
import { db } from '../../../Firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import Loader from '../Loader';

export default function ManageAppointments() {

   const [activeBtn, setActiveBtn] = useState("הגדר תאריך");
   const [inputValues, setInputValues] = useState({
      duration: '',
      openingTime: '',
      closingTime: '',
   });
   const [loading, setLoading] = useState(false);
   const [date, setDate] = useState('');
   const [showPopup, setShowPopup] = useState(false);
   const navigation = useNavigation();
   const [appointments, setAppointments] = useState([]);
   const [blocked, setBlocked] = useState(false);
   
   
   const getDate = (date) => {
      setDate(date);
  };

  const setActivateBtn = (e) => {
   setActiveBtn(e);
   setAppointments([]);
};

   // Handler for changing the admin settings inputs
   const inputChangedHendler = (input, enteredValue) => {
      setInputValues((prevState) => {
         return{
            ...prevState, [input]: enteredValue 
      }
   })};

   // Hendler for button press events and store the data firebase
   const confirmPressedHendler = () => {
      const appointmentsDataByDate = {
         duration: parseInt(inputValues.duration),
         openingTime: parseInt(inputValues.openingTime),
         closingTime: parseInt(inputValues.closingTime),
         date: date,
         isDateExist: true, 
      };
      createAppointmentsList(appointmentsDataByDate)
      setShowPopup(true);
      setTimeout(() => {
         setShowPopup(false);
         navigation.goBack;
      }, 4000);
   };

   // Form validation
   const validation = () => {
      if (!inputValues.duration ||
      !inputValues.openingTime ||
      !inputValues.closingTime ) {
         Alert.alert('', 'יש למלא את כל השדות',
         [{
             text: 'סגירה'
         }])}
      else if(inputValues.openingTime > inputValues.closingTime){
         Alert.alert('', 'יש למלא שעות תקינות',
         [{
             text: 'סגירה'
         }])}
      else {    
         docExistsValidation();
      }
   };
   
   const docExistsValidation = async () => {
      const docRef = doc(db, 'Appointments', date);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
         confirmPressedHendler();
      } else {
         Alert.alert('תאריך זה כבר מוגדר', 'האם אתה בטוח שתרצה לשנות?',
         [{
            text: 'סגירה'
         },
         {text: 'המשך בכל זאת',
            onPress: () => {
               confirmPressedHendler();
            }}])
      }
   };

   const getDate2 = async (date) => {
      setDate(date);
      const docRef = doc(db, 'Appointments', date);
      const docSnap = await getDoc(docRef);
      
      if(docSnap.exists()) {
         let events = docSnap.data().appointments;
         let block = docSnap.data().blocked;
         setBlocked(block);
         setAppointments(events);
      } else {
         setAppointments([]);
      }
   };

   const blockEventsCheck = () => {
      Alert.alert('', `לחסום את כל התורים לתאריך ${date}?`,
                [{
                    text: 'לא'
                },
                {text: 'לחסום',
                onPress: () => {
                  blockAppointments();
                }}])
   };

   const blockAppointments = async () => {
      setLoading(true);
      const docRef = doc(db, 'Appointments', date);
      const docSnap = await getDoc(docRef);
      let events = docSnap.data().appointments;
      let newArray = [];
      for(let i = 0; i<events.length; i++) {
         if(events[i].available){
            events[i].available = false;   
         }
         newArray.push(events[i]);
      }
      await updateDoc(docRef, {
            appointments: newArray,
            blocked: true,
      }); 
      setLoading(false); 
      setBlocked(true);
      Alert.alert('', `התורים נחסמו בהצלחה`,
      [{
          text: 'סגירה'
      }]);
   };

   const deleteEventsCheck = () => {
      Alert.alert('', `למחוק את כל התורים לתאריך ${date}?`,
                [{
                    text: 'לא'
                },
                {text: 'למחוק',
                onPress: () => {
                  deleteAppointments();
                }}])
   };

   const deleteAppointments = async () => {
      setLoading(true);
      await deleteDoc(doc(db, "Appointments", date));
      setLoading(false);
      Alert.alert('', `התורים נמחקו בהצלחה`,
      [{
          text: 'סגירה'
      }]);
   };

   const cancleBlocking = async () => {
      setLoading(true);
      const docRef = doc(db, 'Appointments', date);
      const docSnap = await getDoc(docRef);
      let events = docSnap.data().appointments;
      let newArray = [];
      for(let i = 0; i<events.length; i++) {
         if(!events[i].available){
            events[i].available = true;   
         }
         newArray.push(events[i]);
      }
      await updateDoc(docRef, {
            appointments: newArray,
            blocked: false,
      }); 
      setLoading(false); 
      setBlocked(false);
      Alert.alert('', `ביטול החסימה הסתיים בהצלחה`,
      [{
          text: 'סגירה'
      }]);
   };

    return (
      <View style={styles.container}>
         {showPopup ? <Popup text1="השעות עודכנו בהצלחה!" /> : null}
            <HeaderTabs activeBtn={activeBtn} setActiveBtn={(e) =>setActivateBtn(e)}/> 
            
            { activeBtn === 'חסום תורים' ? 
               <AdminCalendar getDate={e => getDate2(e)} /> :
               <AdminCalendar getDate={e => getDate(e)}/>
            }
            {
            activeBtn === 'הגדר תאריך' ?
            <ScrollView >  
               <View style={styles.adminSettingsContainer}>
                  <DurationInput text='זמן לפגישה בדקות:' onChangeText={(duration) =>inputChangedHendler('duration', duration)}/>
                  <View style={{flexDirection: 'row'}}>
                     <TimeInput header='שעת פתיחה:' 
                        placeholder='10:00' 
                        getTime={(time) =>inputChangedHendler('openingTime', time)}
                        value={inputValues.openingTime} />
                     <TimeInput header='שעת סגירה:' 
                        placeholder='21:00' 
                        getTime={(time) =>inputChangedHendler('closingTime', time)}
                        value={inputValues.closingTime} />
                  </View>
               </View>
               <CustomButton text='אישור' onPress={validation} style={{marginTop: 100}}/>
            </ScrollView >  : 
            appointments.length > 0 && activeBtn === 'חסום תורים' ?
            <><FlatList 
            data={appointments}
            alwaysBounceHorizontal={false} 
            showsScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => (
               <>
                <View style={{alignItems: 'center', marginVertical: 10}}>
                  <View style={styles.apptsContainer}>
                    <Text 
                     style={[styles.apptsTimes, {color: item.available ? '#000' : !item.available && item.userId ? '#E0AA3E' : 'red'}]}>
                        {item.startTime} - {item.endTime}</Text>
                  </View>
                </View>
                </>
        )}/>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Button 
               title={!blocked ? 'חסימת תורים' : 'ביטול חסימה'}
               onPress={!blocked ? blockEventsCheck : cancleBlocking} 
               style={styles.btn}
               buttonStyle={{backgroundColor: '#E0AA3E', borderRadius: 10,}}/>
            <Button 
               title='מחיקת תורים' 
               onPress={deleteEventsCheck} 
               style={styles.btn}
               buttonStyle={{backgroundColor: '#E0AA3E', borderRadius: 10,}}/>
         </View>
        </> : null
            }
            {loading ? <Loader /> : null}
         
      </View>
    );
  };
 
  const DurationInput = (props) => {
      return (
         <View style={styles.inputContainer}>
            <Text style={styles.text}>{props.text}</Text>
            <TextInput 
               keyboardType='numeric'
               placeholder='10'
               style={styles.textInput}
               onChangeText={props.onChangeText}
               maxLength={2}
            />
         </View>
      )
  };

  const TimeInput = ( {getTime, placeholder, header}) => {
   const [open, setOpen] = useState(false);
   const [text, setText] = useState("");
   const [time, setTime] = useState(new Date());
   // const [date, setDate] = useState(new Date());

   const onChange = (event, date) => {
      setTime(date);
      let hours, minutes;
      date.getHours() < 10 ? hours = 
         '0' + JSON.stringify(date.getHours()) :   
          hours = JSON.stringify(date.getHours());
      date.getMinutes() < 10 ? minutes =
         '0' + JSON.stringify(date.getMinutes()) :   
         minutes = JSON.stringify(date.getMinutes());
      setText(hours + ':' + minutes);
      getTime(hours + minutes);
      if(Platform.OS === 'android') {
         setOpen(false);
      }
  };

  const onChangeText =(time) => {
      setText(time);
  }
   return (
      <View style={styles.inputContainer}>
         <Text style={styles.text}>{header}</Text>
         <TextInput 
            placeholder={placeholder}
            style={styles.textInput}
            showSoftInputOnFocus={false}
            onPressIn={() => setOpen(true)}
            value={text}
            onChangeText={onChangeText}
         />
         { open ? <DateTimePicker 
            value={time}
            mode="time"
            display={'default'}
            onChange={onChange}
            /> : null }
      </View>
   )
};

  const styles = StyleSheet.create({
      container: {
         backgroundColor: '#fff',
         flex: 1,
         position: 'relative',
      },
      daysCheckBoxContainer: {
         backgroundColor: '#f5f5f5',
         padding: 10,
         justifyContent: 'center',
         flexDirection: 'row',
         margin: 10,
         borderRadius: 10,
      },
      adminSettingsContainer: {
         flex: 1,
      },
      textInput: {
         backgroundColor: '#f5f5f5',
         borderRadius: 10,
         textAlign: 'right',
         padding: 10,
      },
      inputContainer:{
         marginHorizontal: 10,
         flex: 1,
      },
      text: {
         fontSize: 15,
         fontWeight: 'bold',
         marginVertical: 10,
         color: '#202020',
         alignSelf: 'flex-start',
      },
      moreOptionsText: {
         fontSize: 15,
         fontWeight: 'bold',
         alignSelf: 'center',
         marginTop: 10,
      },
      apptsContainer: {
         backgroundColor: '#fff',
         width: 150,
         borderRadius: 10,
         shadowColor: "#000",
         shadowOffset: {
         width: 0,
         height: 1,
         } ,
         shadowOpacity: 0.22,
         shadowRadius: 2.22,
         elevation: 3,
      },
      apptsTimes: {
         fontSize: 16,
         fontWeight: "bold",
         paddingVertical: 10,
         paddingHorizontal: 10,
         alignSelf: 'center'
       },
       btn: {
         width: 170,
         marginBottom: 20,
       },
  });