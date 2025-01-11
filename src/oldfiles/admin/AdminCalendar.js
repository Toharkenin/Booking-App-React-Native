import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

export default function AdminCalendar({ getDate }) {
    
    const [markedDates, setMarkedDates] = useState({});
    const [selectedDate, setSelectedDates] = useState('');
    
    const onDayPress = (date) => {
        let markedDates = {};
        markedDates[date] = {selected: true, color: '#E0AA3E', textColor: '#FFFFFF'};
        let newDate = moment(date).format("YYYY-MM-DD");
        setSelectedDates(newDate);
        setMarkedDates(markedDates);
        getDate(newDate);
  };
    return (
        <View style={styles.container}>
            <Calendar
                minDate={'2023-01-01'}
              maxDate={"2030-05-30"}
              onDayPress={day => {
                  onDayPress(day.dateString);
              }}
              markedDates={markedDates}
              selectedDate={selectedDate}
              style={styles.calendarStyle}
              theme={{
                calendarBackground: '#fff',
                selectedDayBackgroundColor: '#E0AA3E',
                selectedDayTextColor: '#fff',
                todayTextColor: '#E0AA3E',
                dayTextColor: 'black',
                textDisabledColor: '#A9A9A9',
                monthTextColor: '#E0AA3E',
                textMonthFontWeight: 'bold',
                textDayFontWeight: 'bold',
                arrowColor: '#E0AA3E',
                }} />
        </View>
    );
}

const styles = StyleSheet.create({
  
});


