import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert} from 'react-native';
import BirthDayInput from '../user/BirtheDayInput';
import CustomButton from '../user/CustomButton';
import Input from '../user/Input';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../user/Loader';
import Popup from '../user/Popup';

export default function AddUser(props) {

    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });
    const [birthDay, setBirthDay]= useState("");
    const [displayOTPInput, setDisplayOTPInput] = useState(false);
    const [welcomeMessage, setWelcomeMessage]= useState(false);
    const [code, setCode] = useState("");
    const [loading, setLoading]= useState(false);

    const countryCode = "+972";

    const onChange = (text, input) => {
        setInputs((prevState) => ({...prevState, [input]:text}));
    };

    const getDate = (date) => {
        setBirthDay(date)
    }

    const handleSubmit = () => {
        setLoading(true);
           firestore().collection('Users')
            .where("phoneNumber", "==", inputs.phoneNumber)
            .get()
            .then((snapshot) => {
                if (snapshot.empty) {
                    firestore()
                    .collection('Users')
                    .add({
                        firstName: inputs.firstName,
                        lastName: inputs.lastName,
                        phoneNumber: inputs.phoneNumber,
                        birthDay: birthDay,
                    })
                    .then(() => {
                        // requestOTP();
                        setLoading(false);
                    })
                } else {
                    setLoading(false);
                    Alert.alert('אופס...', 'מספר הטלפון כבר קיים במערכת',
                    [{
                        text: 'סגירה'
                    },
                    {text: 'להתחברות',
                    onPress: () => {
                        navigation.navigate('הזדהות');
                    }}])
                }})  
            };
    
        const requestOTP = async () => {
            setDisplayOTPInput(true);
            const confirmation = await auth().signInWithPhoneNumber(countryCode+inputs.phoneNumber);
            setConfirm(confirmation);
        }
        
        const onAddUserPressed = async () => {
            try {
                await confirm.confirm(code);
                setWelcomeMessage(true);
            } catch (error) {
                console.log(error);
            }
        }

    return (
        <View style={styles.container}>
            <View style={{backgroundColor: '#fff', paddingBottom: 60, borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
            {welcomeMessage ? <Popup /> : null }
            {loading ? <Loader/> : null }
            <TouchableOpacity onPress={props.onXPressed} style={styles.icon}>
                    <Icon name="close-outline" size={40} color="#E0AA3E" />
                </TouchableOpacity>
            <ScrollView>
            {!displayOTPInput ? 
            <>
                <Text style={styles.header}>הוספת משתמש חדש</Text>
                <Input 
                    name="שם פרטי" 
                    iconName="user-o" 
                    onChangeText={text => onChange(text, 'firstName')}
                    />                                     
                <Input 
                    name="שם משפחה" 
                    iconName="user-o"
                    onChangeText={text => onChange(text, 'lastName')}
                    />
                <Input 
                    name="טלפון-נייד" 
                    maxLength={10}
                    iconName="phone"
                    keyboardType="numeric" 
                    onChangeText={text => onChange(text, 'phoneNumber')}
                    />
                <BirthDayInput getDate={(e)=>getDate(e)}/>
                <CustomButton text="הוספה" onPress={()=>handleSubmit()} style={{marginTop: 50}}/>
                </> : 
                    <>
                    <Text style={styles.header}>הזן את הקוד שקיבלת</Text>
                    <Input
                        value={code}
                        name="קוד" 
                        iconName2="message-processing-outline"
                        keyboardType="numeric"
                        onChangeText={setCode}
                    />
                    <CustomButton text="התחברות" onPress={()=>onAddUserPressed()}/>
                    <TouchableOpacity onPress={()=>requestOTP()}>
                        <Text style={styles.text}>
                            לא נשלח קוד, שלחו שוב
                        </Text>
                    </TouchableOpacity>
                    </>
                }
                </ScrollView>
            </View>
        </View>
    );
  };


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    header: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    icon: {
        alignSelf: 'flex-start', 
        left:10,
        top: 10,
    }, 
    text: {
        alignSelf: 'center',
        marginTop: 15,
        fontSize: 16,
    }
  });
