import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, I18nManager } from "react-native";
import moment from "moment";
import "moment/locale/he";
import Icon from "react-native-vector-icons/AntDesign"
///TODO: Right to left weekly calendar!!!!

interface Day {
  date: string;
  isSelected: boolean;
};

if (!I18nManager.isRTL) {
  I18nManager.forceRTL(true);
}

moment.locale("he");

const UserCalendar: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState<Day[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  console.log("works");
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
          <Icon name="left" size={22} style={styles.navButton} />
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
          <Icon name="right" size={22} style={styles.navButton} />
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
        inverted={I18nManager.isRTL}
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
    color: "#c3b091",
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

