import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig, DateData  } from 'react-native-calendars';
// import { } from '';
import { fetchAppointments } from '../../redux/reducers/dateSlice';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import AvaliableMeetings from './AvailiableMeetings';

interface SetCalendarProps {
    getDate: (date: string) => void;
  }

  interface DatePressed { 
    dateString: string; 
    day: number; 
    month: number; 
    year: number; 
    timestamp: number
  }

export default function SetCalendar({getDate}: SetCalendarProps) {
  
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
  const [selectedDate, setSelectedDates] = useState<string>('');
    
 const onDayPress = (date: DatePressed) => {
    let markedDates: Record<string, { selected: boolean; color: string; textColor: string }> = {};
    markedDates[date.dateString] = { selected: true, color: '#C19203', textColor: '#FFFFFF' };

    let newDate: string = date.dateString;
  
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
            onDayPress={(day: DatePressed) => {
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
          <Divider />
          <AvaliableMeetings date={selectedDate} getMeeting={(e)=> (e)}/>
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
