import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig, DateData  } from 'react-native-calendars';
import moment from 'moment';

interface SetCalendarProps {
    getDate: (date: string) => void;
  }

export default function SetCalendar({getDate}: SetCalendarProps) {

  // const startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
  // const endOfWeek = moment().endOf('week').format('YYYY-MM-DD');

  LocaleConfig.locales['il'] = {
    monthNames: [
      'ינואר',
      'פברואר',
      'מרץ',
      'אפריל',
      'מאי',
      'יוני',
      'יולי',
      'אוגוסט',
      'ספטמבר',
      'אוקטובר',
      'נובמבר',
      'דצמבר'
    ],
    dayNames: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
    dayNamesShort: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
  };
  LocaleConfig.defaultLocale = 'il';
const [markedDates, setMarkedDates] = useState({});
const [selectedDate, setSelectedDates] = useState('');
    
 const onDayPress = (date: string) => {
    let markedDates: Record<string, { selected: boolean; color: string; textColor: string }> = {};
    markedDates[date] = { selected: true, color: '#C19203', textColor: '#FFFFFF' };
  
    // Format the date
    let newDate: string = moment(date).format("YYYY-MM-DD");
  
    // Call state setters or functions (assumes these are correctly typed elsewhere)
    setSelectedDates(newDate);
    setMarkedDates(markedDates);
    getDate(newDate);
  };




  return (
      <View>
            <Calendar
            minDate={new Date()}
            maxDate={"2030-05-30"}
            markedDates={markedDates}
            selectedDate={selectedDate}
            onDayPress={(day: string) => {
              onDayPress(day);
            }}
            style={styles.calendarStyle}
            theme={{
            calendarBackground: '#fff',
            selectedDayBackgroundColor: '#C19203',
            selectedDayTextColor: '#fff',
            todayTextColor: '#C19203',
            dayTextColor: '#C19203',
            textDisabledColor: '#A9A9A9',
            monthTextColor: '#C19203',
            textMonthFontWeight: 'bold',
            textDayFontWeight: 'bold',
            arrowColor: '#C19203',
          }}
            />
          </View>
  );
};

const styles = StyleSheet.create({
  calendarStyle: {
    paddingBottom: 20,
    shadowColor: "#fff",
shadowOffset: {
	width: 0,
	height: 1,
},
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
        borderRadius: 15,
        marginTop: 3,
        // marginTop: 100,
  },
  icon: {
    position:'absolute', 
    zIndex: 999, 
    alignSelf: 'flex-end', 
    right:10,
    top: 10,
  },
  text: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 30,
    color: '#E0AA3E',
    fontWeight: '700',
    fontSize: 18,
  },
})



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

