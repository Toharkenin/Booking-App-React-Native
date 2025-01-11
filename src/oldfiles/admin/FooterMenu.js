import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


export default function FooterMenu() {
    const navigation = useNavigation();

    function usersListPressHendler () {
        navigation.navigate('משתמשים', {
            usersEditing: 10
        });
    };

    const SignOut = async () => {
    try {
        await AsyncStorage.removeItem("user");
      } catch (error) {
        console.log(error);
      }};
      
    return (
        <View style={styles.container}>
                <Icon name="calendar" text="ניהול תורים" onPress={() => navigation.navigate("Manage")}/>
                <Icon name="users" text="משתמשים" onPress={usersListPressHendler}/>
                <Icon name="comments-o" text="הודעה" onPress={() => navigation.navigate("Message")}/>
                <Icon name="sign-out" text="יציאה" onPress={SignOut}/>
        </View>
    );
  };

  const Icon = (props) => {
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
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10,
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
