import React, { useState, useRef } from 'react';
import {View, Text, StyleSheet, Image, Pressable, 
    Keyboard, ScrollView, Alert, TouchableWithoutFeedback,} from 'react-native';
import Input from '../../components/user/Input';
import ButtonCustom from '../../components/user/ButtonCustom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducers/userSlice';
import { db, app, auth } from '../../../Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik, FieldInputProps, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/NavigationTypes';

interface Number {
    phoneNumber: string;
}

export default function Login() {

    //states
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [verificationId, setVerificationId] = useState<string>('');
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    // const [displayOTPInput, setDisplayOTPInput] = useState<boolean>(false);
    // const [code, setCode] = useState<string>("");
    // const [loading, setLoading]= useState<boolean>(false);
    // const [welcomeMessage, setWelcomeMessage]= useState<boolean>(false);
    const [userInfo, setUserInfo]= useState({});
    // const user = useSelector((state) => state.user.user);
    
//navigation state
    type navigationProp = StackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<navigationProp>();


    const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
    const dispatch = useDispatch();
    const countryCode = '+972'


    // Yup validation schema
    const phoneSchema = Yup.object().shape({
        phoneNumber: Yup.string()
        .matches(/^05[0-9]+$/, "מספר לא תקין")
        .min(10, 'מספר הטלפון קצר מידי')
        .max(10, 'מספר הטלפון ארוך מידי')
        .required(''),
    });


    // phone validation : checks if the user is authorized
    const handleSubmit = async () => { 
        const docRef = doc(db, 'Users', phoneNumber);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
            sendVerification();    
        }
        else {
            //todo: add error popup
            console.log('error: the user is not logged in');
        }
    };

    // handle signin pressed
    // const handleRecaptcha = async () => {
    //     setLoading(true);
    //     confirmationResult.confirm(code).then((result) => {
    //         setWelcomeMessage(true); 
    //         storeUser(); 
    //         setTimeout(() => {
    //             setWelcomeMessage(false);
    //             dispatch(login(userInfo)); 
    //             setCode("");
    //          }, 4000);
    //       }).catch((error) => {
    //         Alert.alert('אופס...', 'הקוד שהקשת אינו תקין',
    //         [{
    //             text: 'סגירה'
    //         }]
    //       )});
    // }

    const sendVerification = async () => {
        console.log('in verification', phoneNumber, "fff", new PhoneAuthProvider(auth));
        try {
          const phoneProvider = new PhoneAuthProvider(auth);          
          const verificationId = await phoneProvider.verifyPhoneNumber(
            phoneNumber,
            recaptchaVerifier.current!
          );
          setVerificationId(verificationId);
          console.log('Verification', verificationId);
        //   navigation.navigate('OTPVerificationScreen', { verificationId });
          setMessage('Verification code sent to your phone.');
        } catch (error: any) {
          setMessage(`Error: ${error.message}`);
        }
    };

    
    const confirmCode = async () => {
        try {
          const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
          const userCredential = await signInWithCredential(auth, credential);
          setMessage('Phone authentication successful!');
          storeUser();
          console.log('User:', userCredential.user);
        } catch (error: any) {
          setMessage(`Error: ${error.message}`);
        }
      };

    
    const storeUser = async () => {
        const value = userInfo;
        try {
            await AsyncStorage.setItem("user", JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={{backgroundColor: '#FBFBFD', flex: 1}}>
        <Formik<Number>
        initialValues={{ phoneNumber: '' }}
        validationSchema={phoneSchema}
        onSubmit={() => {handleSubmit()}} 
        >
            {({handleChange, handleBlur, values, errors}) => (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={{marginBottom: 40, alignItems: 'center', flex: 1}}>
                        <Text style={styles.text}>התחברות</Text>
                        <Input 
                            name="טלפון-נייד" 
                            iconName="phone"
                            keyboardType="phone-pad"
                            onChangeText={(text) => {
                                handleChange('phoneNumber')(text);
                                setPhoneNumber(text);
                              }}
                            onBlur={handleBlur('phoneNumber')}
                            value={values.phoneNumber}
                            autoFocus={false}
                            />  
                            {errors.phoneNumber &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.phoneNumber}</Text>
                            }
                            <Button  title="שלחו לי קוד בבקשה"
                                buttonStyle={{ backgroundColor: '#FFA500' }}
                                containerStyle={{
                                height: 40,
                                width: 200,
                                marginHorizontal: 50,
                                marginVertical: 10,}}
                                onPress={() => handleSubmit()}/>
                            <ButtonCustom  
                                onPress={() => navigation.navigate('Feed')}
                                text="חזרה לעמוד הראשי"/>
                            <ButtonCustom  
                                onPress={() => navigation.navigate('Signup')}
                                text="לקוח חדש? לחץ להרשמה"/>
                   </ View> 
                   </TouchableWithoutFeedback>       
            )}   
        </Formik>
        </View>
    )
};


const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: "700",
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 10,
        color: '#222',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    primText: {
        marginTop: 20,
        fontSize: 18,
        color: '#000',
        marginRight: 5,
    },
    logo: {
        height: 140,
        width: 140,
        marginTop: 30,
        alignSelf: "center",
    },
    newUserText: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 20,
        alignSelf: "center",
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginRight: 40,
        marginTop: 10,
    },
});



 //     <SafeAreaView style={{backgroundColor: '#fff', flex:1}}>
    //     {loading ? <Loader/> : null }
    //     {welcomeMessage ? <Popup
    //         text1="שמחים שחזרת!" 
    //         text2="מיד תעבור לעמוד..."/> : null }
    // <ScrollView >
    //     <FirebaseRecaptchaVerifierModal
    //         ref={recaptchaVerifier}
    //         // firebaseConfig={app.options}
    //         attemptInvisibleVerification={true}
    //     />
    //     {/* <Image source= {logo} style={styles.logo} resizeMode="contain" /> */}
    //     {!displayOTPInput ?
    //     <>
    //     <Text style={styles.text}>הזן מספר טלפון נייד להזדהות</Text>
    //     <View style={{marginBottom: 40}}>
    //         <Input 
    //             value={phoneNumber}
    //             name="טלפון-נייד" 
    //             maxLength={10}
    //             minLength={10}
    //             iconName="phone"
    //             keyboardType="numeric"
    //             onChangeText={setPhoneNumber} />
    //     </View>
    //     {/* <SubmitButton /> */}
    //     <View style={styles.textContainer}>
    //         {/* <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
    //                 <Text style={styles.primText}>לחץ ליצירת חשבון</Text>
    //         </TouchableOpacity> */}
    //     </View>
    //     </> : 
    //     <>
    //         <Text style={styles.text}>הזן את הקוד שקיבלת</Text>
    //         <Input 
    //             value={code}
    //             name="קוד" 
    //             iconName2="message-processing-outline"
    //             keyboardType="numeric"
    //             onChangeText={setCode}
    //             maxLength={6}
    //         />
    //         {/* <CustomButton text="התחברות" onPress={()=>onSigninPressed()} textStyle={{color: '#fff'}}/> */}
    //         <Pressable onPress={()=>requestOTP()}>
    //             <Text style={styles.text}>
    //                 לא קיבלתי קוד, שלחו לי שוב
    //             </Text>
    //         </Pressable>
    //         <TouchableOpacity onPress={() => setDisplayOTPInput(false)}>
    //                 <Text style={styles.primText}>חזרה להתחברות</Text>
    //         </TouchableOpacity>
    //     </>
    //     }
    // </ScrollView>
    // </SafeAreaView>







    
    // // checks if the phone number exists in the db, and sends OTP request
    // const hendleOTPRequest = async () => {
    //     setLoading(true);
    //     const docRef = doc(db, 'Users', phoneNumber);
    //     const docSnap = await getDoc(docRef);
    //     if (!docSnap.exists()) {
    //         setLoading(false);
    //         Alert.alert('אופס...', 'מספר הטלפון לא קיים במערכת',
    //             [{
    //                 text: 'סגירה'
    //             },
    //             {text: 'להרשמה',
    //             onPress: () => {
    //                  navigation.navigate('פתיחת משתמש');
    //             }}]) 
    //       } else {
    //         setUserInfo({
    //             firstName: docSnap.data().firstName,
    //             lastName: docSnap.data().lastName,
    //             phoneNumber: docSnap.data().phoneNumber,
    //             birthDay: docSnap.data().birthDay,
    //             isAdmin: docSnap.data().isAdmin,
    //         });
    //         requestOTP();
    //       };
    //       setLoading(false);
    // };
    
    // onPress handle to request OTP
    // const requestOTP = async () => {
    //     const auth = getAuth();
    //     setDisplayOTPInput(true);
    //     signInWithPhoneNumber(auth, countryCode+phoneNumber, recaptchaVerifier.current)
    //         .then((confirmationResult) => {
    //             console.log('c...', confirmationResult);
    //             // window.confirmationResult = confirmationResult;
    //         }).catch((error) => {
    //             console.log('ee', error)
    //         })
    // };

