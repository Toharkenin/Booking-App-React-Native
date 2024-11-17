// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Calendar, LocaleConfig } from 'react-native-calendars';
// import moment from 'moment';

// interface SetCalendarProps {
//     getDate: (date: string) => void;
//   }

// export default function SetCalendar({getDate}: SetCalendarProps) {

//   const startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
//   const endOfWeek = moment().endOf('week').format('YYYY-MM-DD');

//   LocaleConfig.locales['il'] = {
//     monthNames: [
//       'ינואר',
//       'פברואר',
//       'מרץ',
//       'אפריל',
//       'מאי',
//       'יוני',
//       'יולי',
//       'אוגוסט',
//       'ספטמבר',
//       'אוקטובר',
//       'נובמבר',
//       'דצמבר'
//     ],
//     dayNames: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
//     dayNamesShort: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
//   };
//   LocaleConfig.defaultLocale = 'il';
// const [markedDates, setMarkedDates] = useState({});
// const [selectedDate, setSelectedDates] = useState('');
    
//  const onDayPress = (date: string) => {
//     let markedDates: Record<string, { selected: boolean; color: string; textColor: string }> = {};
//     markedDates[date] = { selected: true, color: '#C19203', textColor: '#FFFFFF' };
  
//     // Format the date
//     let newDate: string = moment(date).format("YYYY-MM-DD");
  
//     // Call state setters or functions (assumes these are correctly typed elsewhere)
//     setSelectedDates(newDate);
//     setMarkedDates(markedDates);
//     getDate(newDate);
//   };


//   return (
//       <View>
//             <Calendar
//             minDate={startOfWeek}
//             maxDate={endOfWeek}
//             markedDates={markedDates}
//             selectedDate={selectedDate}
//             onDayPress={day => {
//               onDayPress(day.dateString);
//           }}
//             style={styles.calendarStyle}
//           theme={{
//             calendarBackground: '#fff',
//             // selectedDayBackgroundColor: '#C19203',
//             // selectedDayTextColor: '#fff',
//             // todayTextColor: '#C19203',
//             // dayTextColor: '#C19203',
//             // textDisabledColor: '#A9A9A9',
//             // // selectedDayBackgroundColor: '#C19203',
//             // monthTextColor: '#C19203',
//             // textMonthFontWeight: 'bold',
//             // textDayFontWeight: 'bold',
//             // arrowColor: '#C19203',
//           }}
//             />
//           </View>
//   );
// };

// const styles = StyleSheet.create({
//   calendarStyle: {
//     paddingBottom: 20,
// //     shadowColor: "#fff",
// // shadowOffset: {
// // 	width: 0,
// // 	height: 1,
// // },
// //     shadowOpacity: 0.18,
// //     shadowRadius: 1.00,
// //     elevation: 1,
// //         borderRadius: 15,
// //         marginTop: 3,
// //         // marginTop: 100,
//   },
//   icon: {
//     position:'absolute', 
//     zIndex: 999, 
//     alignSelf: 'flex-end', 
//     right:10,
//     top: 10,
//   },
//   text: {
//     position: 'absolute',
//     alignSelf: 'center',
//     bottom: 30,
//     color: '#E0AA3E',
//     fontWeight: '700',
//     fontSize: 18,
//   },
// })



// import React, { useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import moment from 'moment';

// interface AdminCalendarProps {
//   getDate: (date: string) => void;
// }

// interface DayObject {
//   dateString: string;
//   day: number;
//   month: number;
//   year: number;
//   timestamp: number;
// }

// export default function UserCalendar({getDate}:AdminCalendarProps) {
//   const [markedDates, setMarkedDates] = useState<Record<string, { selected: boolean; color: string; textColor: string }>>({});
//   const [selectedDate, setSelectedDates] = useState<string>('');

//   const onDayPress = (day: DayObject) => {{
//     const newMarkedDates: Record<string, { selected: boolean; color: string; textColor: string }> = {};
//     newMarkedDates[day.dateString] = { selected: true, color: '#E0AA3E', textColor: '#FFFFFF' };
//     const newDate: string = moment(day).format('YYYY-MM-DD');
//     setSelectedDates(newDate);
//     setMarkedDates(newMarkedDates);
//     getDate(newDate);
//   }};

//   return (
//     <View style={styles.container}>
//       <Calendar
//         minDate={'2023-01-01'}
//         maxDate={'2030-05-30'}
//         onDayPress={(day) => onDayPress(day.dateString)}
//         markedDates={markedDates}
//         style={styles.calendarStyle}
//         theme={{
//           calendarBackground: '#fff',
//           selectedDayBackgroundColor: '#E0AA3E',
//           selectedDayTextColor: '#fff',
//           todayTextColor: '#E0AA3E',
//           dayTextColor: 'black',
//           textDisabledColor: '#A9A9A9',
//           monthTextColor: '#E0AA3E',
//           textMonthFontWeight: 'bold',
//           textDayFontWeight: 'bold',
//           arrowColor: '#E0AA3E',
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   calendarStyle: {},
// });


// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native';
// import { Agenda, CalendarProvider  } from 'react-native-calendars';

// import moment from 'moment';

// interface AppointmentDetailsProps {
//   onClosePress: () => void;
//   onCanclePress: () => void;
// }

// interface ServiceProps {
//   getService: (service: string) => void;
//   onXPressed: () => void;
// }

// interface CalendarProps {
//   getDate: (date: string) => void;
// }

// interface AppointmentItem {
//   startTime: string;
//   endTime: string;
//   available: boolean;
//   index: string;
//   date: string;
//   userId?: string;
// }
// export default function UserCalendar({getDate}:CalendarProps) {
//     //hook for appointments in the calendar
//     const [appointments, setAppointments] = useState<Record<string, AppointmentItem[]>>({});
//     const [date, setDate] = useState<Date>(new Date());
//     const [loading, setLoading] = useState<boolean>(false);
//     const [service, setService] = useState<string>('');
//     const [showPopup, setShowPopup] = useState<boolean>(false);
//     const [chooseService, setChooseService] = useState<boolean>(false);
//     const [apptDetails, setApptDetails] = useState<AppointmentItem>({
//       startTime: '',
//       endTime: '',
//       available: false,
//       index: '',
//       date: '',
//     });

 

//     const onDayPress = (date: { dateString: string }) => {
//       const newMarkedDates = {
//         [date.dateString]: { selected: true, color: '#E0AA3E', textColor: '#FFFFFF' },
//       };
//       const newDate = moment(date.dateString).format('YYYY-MM-DD');
//       // setSelectedDates(newDate);
//       // setMarkedDates(newMarkedDates);
//       getDate(newDate);
//     };
  
//     const renderItem = (item: AppointmentItem) => {
//       return (
//         <Pressable style={styles.item}>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             {item.available ? (
//               <>
//                 <Pressable
//                   onPress={() => null
//                     // onCreateApptPressed(item.startTime, item.endTime, item.available, item.index, item.date)
//                   }
//                 >
//                   {/* <Icon name="md-add-sharp" size={30} style={{ marginHorizontal: 10, color: '#000' }} /> */}
//                 </Pressable>
//                 <Text style={styles.timeText}>
//                   {item.startTime} - {item.endTime}
//                 </Text>
//               </>
//             ) : !item.available && item.userId ? (
//               <Pressable
//                 onPress={() => null
//                   // onExistingApptPresed(
//                   //   item.startTime,
//                   //   item.endTime,
//                   //   item.available,
//                   //   item.index,
//                   //   item.userId!,
//                   //   item.date
//                   // )
//                 }
//                 style={{ flexDirection: 'row', alignItems: 'center' }}
//               >
//                 <View
//                   style={{
//                     backgroundColor: '#E0AA3E',
//                     height: 40,
//                     width: 40,
//                     borderRadius: 30,
//                     margin: 10,
//                     justifyContent: 'center',
//                   }}
//                 >
//                   {/* <Icon name="person-sharp" size={25} style={{ color: '#fff', alignSelf: 'center' }} /> */}
//                 </View>
//                 <View style={{ alignItems: 'center' }}>
//                   <Text style={styles.timeText}>
//                     {item.startTime} - {item.endTime}
//                   </Text>
//                   <Text style={{ marginTop: 7, fontSize: 14 }}>{item.userId}</Text>
//                 </View>
//               </Pressable>
//             ) : (
//               <>
//                 <View
//                   style={{
//                     backgroundColor: '#E0AA3E',
//                     height: 40,
//                     width: 40,
//                     borderRadius: 30,
//                     margin: 10,
//                     justifyContent: 'center',
//                   }}
//                 >
//                   {/* <Icon2 name="block" size={30} color="#000" style={{ alignSelf: 'center' }} /> */}
//                 </View>
//                 <View style={{ alignItems: 'center' }}>
//                   <Text style={styles.timeText}>
//                     {item.startTime} - {item.endTime}
//                   </Text>
//                   <Text style={{ marginTop: 7, fontSize: 14 }}>{item.userId}</Text>
//                 </View>
//               </>
//             )}
//           </View>
//         </Pressable>
//       );
//     };
  
//     return (
//       <SafeAreaView style={styles.container}>
//         {/* {loading && <Loader />} */}
//         {/* {showPopup && <AppointmentDetails onClosePress={() => setShowPopup(false)} onCanclePress={onCancleApptPress} />} */}
//         <CalendarProvider date="">
//           <Agenda
//             items={appointments}
//             refreshControl={null}
//             showClosingKnob={true}
//             refreshing={false}
//             selected={new Date().toISOString().split('T')[0]}
//             renderItem={renderItem}
//             renderEmptyData={() => (
//               <Text style={{ alignSelf: 'center', marginTop: 100, color: 'silver' }}>אין תורים בתאריך זה</Text>
//             )}
//             pastScrollRange={30}
//             futureScrollRange={30}
//             scrollEnabled={true}
//             onDayPress={(date) => setDate(new Date(date.dateString))}
//             theme={{
//               agendaDayTextColor: '#E0AA3E',
//               agendaDayNumColor: '#E0AA3E',
//               agendaTodayColor: '#E0AA3E',
//               agendaKnobColor: '#E0AA3E',
//               selectedDayBackgroundColor: '#E0AA3E',
//               dotColor: '#E0AA3E',
//               todayTextColor: '#E0AA3E',
//             }}
//           />
//         </CalendarProvider>
//         {/* {chooseService && (
//           <Services getService={(e) => getService(e)} onXPressed={() => setChooseService(false)} />
//         )}
//         <FooterMenu /> */}
//       </SafeAreaView>
//     );
//   }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginTop: 20,
//     },
//     item: {
//         borderRadius: 5,
//         paddingVertical: 10,
//         marginRight: 10,
//         marginTop: 20,
//         backgroundColor: '#fff',
//         shadowColor: "#000",
//         shadowOffset: {
//           width: 10,
//           height: 10,
//         },
//         elevation: 10, 
//     },
//     nameText: {
//         fontSize: 16,
//     },
//     timeText: {
//         fontSize: 16,
//         fontWeight: '500',
//         color: '#000',
//         alignSelf: 'center',
//     },
//     serviceText: {
//         fontSize: 16,
//     },
//     icon: {
//         alignSelf: 'center',
//         margin: 10,
//     },
// });



import React from 'react';
import { View, StyleSheet } from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';

const MyWeeklyCalendar = () => {
  // Example events
  const events = [
    {
      id: 1,
      description: 'Meeting with team',
      startDate: '2024-11-13T10:00:00.000Z', // ISO format date
      endDate: '2024-11-13T11:00:00.000Z',
      color: 'blue',
    },
    {
      id: 2,
      description: 'Lunch with client',
      startDate: '2024-11-14T12:00:00.000Z',
      endDate: '2024-11-14T13:00:00.000Z',
      color: 'green',
    },
  ];

  return (
    <View style={styles.container}>
      <WeeklyCalendar events={events} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default MyWeeklyCalendar;
