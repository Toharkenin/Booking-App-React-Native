import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, I18nManager } from "react-native";
import moment from "moment";
import "moment/locale/he";
import Icon from "react-native-vector-icons/AntDesign"

interface Day {
  date: string;
  isSelected: boolean;
};

interface dateProp {
  getDate: (date: string) => void;
};

if (!I18nManager.isRTL) {
  I18nManager.forceRTL(true);
}

moment.locale("he");

export default function UserCalendar({ getDate }: dateProp) {

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
    getDate(date);
    console.log("Selected date", selectedDate);
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
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => handleWeekChange("prev")}>
          <Icon name="right" size={22} style={styles.navButton} />
        </TouchableOpacity>
        {currentWeek.length >= 7 ? (
          <Text style={styles.currentWeek}>
            {moment(currentWeek[0].date).format("MMM DD")} -{" "}
            {moment(currentWeek[6].date).format("MMM DD")}
          </Text>
        ) : (
          <Text style={styles.currentWeek}>Loading...</Text>
        )}
        <TouchableOpacity onPress={() => handleWeekChange("next")}>
          <Icon name="left" size={22} style={styles.navButton} />
        </TouchableOpacity>
      </View>

      {/* Weekly Calendar */}
      <FlatList
        data={currentWeek}
        // horizontal
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
        inverted={I18nManager.isRTL}
        showsHorizontalScrollIndicator={false}
        // style={styles.flatListStyle}
        contentContainerStyle={styles.flatListStyle}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    marginTop: 20,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  navButton: {
    color: "#FFA500",
  },
  currentWeek: {
    fontSize: 16,
    fontWeight: 500,
  },
  flatListStyle: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateContainer: {
    alignItems: "center",
    width: 40,
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  selectedDate: {
    backgroundColor: "#FFA500",
  },
  dayOfWeek: {
    fontSize: 16,
    fontWeight: 500,
    color: "#333",
  },
  date: {
    marginTop: 5,
    fontSize: 14,
    color: "#333",
  },
});

