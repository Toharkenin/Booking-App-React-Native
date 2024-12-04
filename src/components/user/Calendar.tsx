import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import moment from "moment";

interface Day {
  date: string;
  isSelected: boolean;
}

const UserCalendar: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState<Day[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Generate the days for the current week
  const getWeekDays = (startDate: moment.Moment) => {
    const weekDays: Day[] = [];
    for (let i = 0; i < 7; i++) {
      const day = moment(startDate).startOf("week").add(i, "days");
      weekDays.push({ date: day.format("YYYY-MM-DD"), isSelected: false });
    }
    return weekDays;
  };

  // Initialize the current week
  useEffect(() => {
    const today = moment();
    const weekDays = getWeekDays(today);
    setCurrentWeek(weekDays);
    setSelectedDate(today.format("YYYY-MM-DD"));
  }, []);

  // Handle selecting a date
  const handleDateSelect = (date: string) => {
    setCurrentWeek((prevWeek) =>
      prevWeek.map((day) => ({ ...day, isSelected: day.date === date }))
    );
    setSelectedDate(date);
  };

  // Navigate weeks
  const handleWeekChange = (direction: "prev" | "next") => {
    const referenceDate = moment(selectedDate);
    const newStartDate =
      direction === "next"
        ? referenceDate.add(7, "days")
        : referenceDate.subtract(7, "days");
    setCurrentWeek(getWeekDays(newStartDate));
    setSelectedDate(newStartDate.format("YYYY-MM-DD"));
  };

  return (
    <View style={styles.container}>
      {/* Week Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => handleWeekChange("prev")}>
          <Text style={styles.navButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.currentWeek}>
          {moment(currentWeek[0].date).format("MMM DD")} -{" "}
          {moment(currentWeek[6].date).format("MMM DD")}
        </Text>
        <TouchableOpacity onPress={() => handleWeekChange("next")}>
          <Text style={styles.navButton}>{">"}</Text>
        </TouchableOpacity>
      </View>


      {/* Weekly Calendar */}
      <FlatList
        data={currentWeek}
        horizontal
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dateContainer,
              item.isSelected ? styles.selectedDate : {},
            ]}
            onPress={() => handleDateSelect(item.date)}
          >
            <Text style={styles.dayOfWeek}>
              {moment(item.date).format("ddd")}
            </Text>
            <Text style={styles.date}>{moment(item.date).format("D")}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default UserCalendar;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  navButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
  },
  currentWeek: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateContainer: {
    alignItems: "center",
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  selectedDate: {
    backgroundColor: "#007bff",
  },
  dayOfWeek: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#333",
  },
});

// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Calendar, LocaleConfig, DateData  } from 'react-native-calendars';
// // import { } from '';
// import { fetchAppointments } from '../../redux/reducers/dateSlice';
// import moment from 'moment';
// import { useDispatch, useSelector } from 'react-redux';
// import { Divider } from 'react-native-elements/dist/divider/Divider';
// import AvaliableMeetings from './AvailiableMeetings';

// interface SetCalendarProps {
//     getDate: (date: string) => void;
//   }

//   interface DatePressed { 
//     dateString: string; 
//     day: number; 
//     month: number; 
//     year: number; 
//     timestamp: number
//   }

// export default function SetCalendar({getDate}: SetCalendarProps) {
  
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
//   const [markedDates, setMarkedDates] = useState({});
//   const [selectedDate, setSelectedDates] = useState<string>('');
    
//  const onDayPress = (date: DatePressed) => {
//     let markedDates: Record<string, { selected: boolean; color: string; textColor: string }> = {};
//     markedDates[date.dateString] = { selected: true, color: '#C19203', textColor: '#FFFFFF' };

//     let newDate: string = date.dateString;
  
//     setSelectedDates(newDate);
//     setMarkedDates(markedDates);
//     getDate(newDate);
//   };

//   return (
//       <View>
//             <Calendar
//             minDate={new Date()}
//             maxDate={"2030-05-30"}
//             markedDates={markedDates}
//             selectedDate={selectedDate}
//             onDayPress={(day: DatePressed) => {
//               onDayPress(day);
//             }}
//             style={styles.calendarStyle}
//             theme={{
//             calendarBackground: '#fff',
//             selectedDayBackgroundColor: '#C19203',
//             selectedDayTextColor: '#fff',
//             todayTextColor: '#C19203',
//             dayTextColor: '#C19203',
//             textDisabledColor: '#A9A9A9',
//             monthTextColor: '#C19203',
//             textMonthFontWeight: 'bold',
//             textDayFontWeight: 'bold',
//             arrowColor: '#C19203',
//           }}
//             />
//           <Divider />
//           <AvaliableMeetings date={selectedDate} getMeeting={(e)=> (e)}/>
//           </View>
//   );
// };

// const styles = StyleSheet.create({
//   calendarStyle: {
//     paddingBottom: 20,
//     shadowColor: "#fff",
// shadowOffset: {
// 	width: 0,
// 	height: 1,
// },
//     shadowOpacity: 0.18,
//     shadowRadius: 1.00,
//     elevation: 1,
//         borderRadius: 15,
//         marginTop: 3,
//         // marginTop: 100,
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
