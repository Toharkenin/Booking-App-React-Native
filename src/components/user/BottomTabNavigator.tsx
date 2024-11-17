import React, {useState} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Switch, I18nManager} from 'react-native';
import FontAwesome from 'react-native-vector-icons/AntDesign';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/NavigationTypes';
import { useIsFocused } from '@react-navigation/native';

export default function BottomTabNavigator() {

    // const navigation = useNavigation();
    // const [screenActive, setScreenActive] = useState();
    type FeedNavigationProp = StackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<FeedNavigationProp>();

    const activeScreenColor = () => {

    }

    return (
        //         onStateChange={(state) => {
        //             // const currentRoute = state.routes[state.index].name;
        //             // console.log('Active screen is:', currentRoute);
        //         }}>
            <View style={styles.container}>
                <Icon name="home" text="בית" onPress={() => navigation.navigate('Feed')} color={"blue"}/>
                <Icon name="user" text="פרופיל" onPress={() => navigation.navigate('Profile')} color={"blue"}/>
                <Icon name="pluscircle" text="קביעת תור" onPress={() => navigation.navigate('ScheduleAppt')} color="#F57C00"/>
                <Icon name="calendar" text="התורים שלי" onPress={() => navigation.navigate('Appointments')} color={"blue"}/>
                <Icon name="logout" text="עוד" onPress={() => null} color={"blue"}/>
        </View>
    );
  }

  interface icon {
        name: string;
        text: string;
        onPress: () => void;
        color: string;
  };
  
  const Icon = (props:icon) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <FontAwesome 
                name={props.name}
                size={24}
                style={styles.icons} />
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    )
  }

  const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    icons: {
        color: '#3C3F42',
        alignSelf: 'center',
    },
    text: {
        marginTop: 5,
        color: '#000',
    },
  });

  
  