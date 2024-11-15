import React, { useState, useRef } from 'react';
import { Text, Image, StyleSheet, Keyboard, View, Alert, TouchableWithoutFeedback, Pressable} from 'react-native';
// import logo from '../assets/logo-dark.png';
import Input from '../components/user/Input';
// import CustomButton from '../components/user/CustomButton';
// import BirthDayInput from '../components/user/BirtheDayInput';
// import Popup from '../components/user/Popup';
import { useDispatch } from 'react-redux';
import { login } from '../../src/redux/reducers/userSlice';
import { db, app } from '../../Firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../utils/NavigationTypes';
import {  AppDispatch } from '../redux/store';
// import { getAuth, signInWithPhoneNumber, getCodeFromUserInput } from 'firebase/auth';
// import Loader from '../components/user/Loader';
// import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';

type InputTypes = {
    [key: string]: string;
  };

interface Inputs {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export default function Signup({}) {

    //States
    const [inputs, setInputs] = useState<Inputs>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });

    const [birthDay, setBirthDay]= useState<Date>();
    const [loading, setLoading]= useState<boolean>(false);
    const [welcomeMessage, setWelcomeMessage]= useState<boolean>(false);
    const [displayOTPInput, setDisplayOTPInput] = useState<boolean>(false);
    const dispatch:AppDispatch = useDispatch();
    const [code, setCode] = useState<string>('');

    const recaptchaVerifier = useRef(null);

    //navigation state
    type FeedNavigationProp = StackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<FeedNavigationProp>();

    const countryCode = "+972";

    const onChange = (text:string, input: keyof InputTypes) => {
        setInputs((prevState) => ({...prevState, [input]:text}));
    };

    const getDate = (date: Date) => {
        setBirthDay(date)
    }
    
    //form validation, activates the button if all fields are valid
    // function SubmitButton({onPress}) { 
    //     if (!inputs.firstName ||
    //         !inputs.lastName || 
    //         !birthDay ||
    //         inputs.phoneNumber.toString().length < 10 ||
    //         inputs.phoneNumber.toString()[0] !== "0" ||
    //         inputs.phoneNumber.toString()[1] !== "5"
    //         ) {
    //         return <CustomButton text="המשך" disabled textStyle={{color: '#fff'}}/>
    //     } else {
    //         return <CustomButton text="המשך" onPress={onPress} textStyle={{color: '#fff'}}/>
    //     }
    // }

    const storeUser = async () => {
        // const value = {
        //     firstName: inputs.firstName,
        //     lastName: inputs.lastName,
        //     phoneNumber: inputs.phoneNumber,
        //     // birthDay: birthDay,
        //     // isAdmin: false,
        // }
        dispatch(login(inputs));
        try {
            await AsyncStorage.setItem("user", JSON.stringify(inputs));
        } catch (error) {
            console.log(error);
        }
    }

    //add user to firebase depending on phone number existance in the db
    // const handleSubmit = async () => {
    //     setLoading(true);
    //     const docRef = doc(db, 'Users', inputs.phoneNumber);
    //     const docSnap = await getDoc(docRef);
    //     if (docSnap.exists()) {
    //         setLoading(false);
    //             Alert.alert('אופס...', 'מספר הטלפון כבר קיים במערכת',
    //             [{
    //                 text: 'סגירה'
    //             },
    //             {text: 'להתחברות',
    //             onPress: () => {
    //                  navigation.navigate('הזדהות');
    //             }}])
    //       } else {
    //             requestOTP();
    //             setLoading(false);
    //       }

    // const resetForm = () => {
    //     setInputs.firstName("");
    //     setInputs.lastName("");  
    //     setInputs.phoneNumber("");
    //     // setBirthDay("");
    // }};

    const requestOTP = async () => {
        // const auth = getAuth();
        // setDisplayOTPInput(true);
        // signInWithPhoneNumber(auth, countryCode+inputs.phoneNumber, recaptchaVerifier.current)
        //     .then((confirmationResult) => {
        //         console.log('c...', confirmationResult);
        //         window.confirmationResult = confirmationResult;
        //     }).catch((error) => {
        //         console.log('ee', error)
        //     })
    }
    
    // const onSignupPressed = () => {

    //         confirmationResult.confirm(code).then((result) => {
    //             setWelcomeMessage(true);
    //             const newUser = setDoc(doc(db, 'Users', inputs.phoneNumber),
    //                 {
    //                     firstName: inputs.firstName,
    //                     lastName: inputs.lastName,
    //                     phoneNumber: inputs.phoneNumber,
    //                     birthDay: birthDay,
    //                     appointments: [],
    //                     numOfEvents: 1,
    //                     isAdmin: false,
    //                 })
    //             newUser;  
    //             storeUser(); 
    //             setTimeout(() => {
    //                 setWelcomeMessage(false);
    //                 setCode("");
    //              }, 4000);
    //           }).catch((error) => {
    //             Alert.alert('אופס...', 'הקוד שהקשת אינו תקין',
    //             [{
    //                 text: 'סגירה'
    //             }]
    //           )});
    // }

    return (
        // <SafeAreaView style={{backgroundColor: '#fff', flex:1}}>
        //     {loading ? <Loader />: null }
        //     {welcomeMessage ? <Popup 
        //         text1="נרשמת בהצלחה!" 
        //         text2="מיד תעבור לעמוד..."/> : null }
        // <ScrollView>
        // <FirebaseRecaptchaVerifierModal
        //     ref={recaptchaVerifier}
        //     firebaseConfig={app.options}
        //     attemptInvisibleVerification={true}
        //     />
        // {!displayOTPInput ? 
        // <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{marginBottom: 40, paddingTop: 30, flex: 1}}>
            {/* <Image source= {logo} style={styles.logo} resizeMode="contain"/> */}
            <Input 
                name="שם פרטי" 
                iconName="user-o" 
                onChangeText={(text) => onChange(text, 'firstName')}
                autoFocus={true}
                placeholder='שם פרטי'/>                                     
            <Input 
                name="שם משפחה" 
                iconName="user-o"
                onChangeText={text => onChange(text, 'lastName')}
                autoFocus={true}
                placeholder='שם משפחה'/>
            <Input 
                name="טלפון-נייד" 
                maxLength={10}
                iconName="phone"
                keyboardType="numeric" 
                onChangeText={text => onChange(text, 'phoneNumber')}
                autoFocus={true}
                placeholder='טלפון נייד'/>
            {/* <BirthDayInput getDate={(e)=>getDate(e)}
                autoFocus={true}/> */}
            <Button  title="שלחו לי קוד בבקשה"
                buttonStyle={{ backgroundColor: 'rgba(255, 140, 66, 1)' }}
                containerStyle={{
                    height: 40,
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,}}/>
            </View>
            
        </TouchableWithoutFeedback>


    );
  };


  const styles = StyleSheet.create({
    logo: {
        height: 160,
        width: 160,
        alignSelf: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    primText: {
        marginTop: 20,
        fontSize: 18,
        alignSelf: 'center',
        color: '#000',
        marginRight: 5,
        // color: '#E0AA3E'
    },
    secText: {
        marginTop: 13,
        fontSize: 16,
        alignSelf: 'center',
        color: '#000'
    },
    header: {
        fontSize: 20,
        fontWeight: '800',
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 16,
        color: '#000'
    }
});



// </View>
// <SubmitButton onPress={(e) => handleSubmit(e)} />
// <View style={styles.textContainer}>
//     <Pressable onPress={() => navigation.navigate('Signin')}>
//             <Text style={styles.primText}>לחץ להתחברות</Text>
//     </Pressable>
// </View>
//     </> : 
//      <View style={{marginTop: 30}}>
//      <Text style={styles.header}>הזן את הקוד שקיבלת</Text>
//      <Input 
//          value={code}
//          name="קוד" 
//          iconName2="message-processing-outline"
//          keyboardType="numeric"
//          onChangeText={setCode}
//      />
//      <CustomButton text="התחברות" onPress={()=>onSignupPressed()}/>
//      <Pressable onPress={()=>requestOTP()}>
//          <Text style={styles.primText}>
//              לא קיבלתי קוד, שלחו לי שוב
//          </Text>
//      </Pressable>
//      <Pressable onPress={() => setDisplayOTPInput(false)}>
//          <Text style={styles.secText}>
//              חזרה לפתיחת משתמש
//          </Text>
//      </Pressable>
//      </View>
// }
//     </ScrollView>