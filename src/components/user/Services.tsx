import React, { useEffect } from 'react';
import {View, Text, StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue, withSpring, useAnimatedStyle, withRepeat
} from 'react-native-reanimated';
import { Button } from 'react-native-elements';

const servicesArray = [
  {name: 'תספורת'},
  {name: 'תספורת וזקן'},
  {name: 'תספורת ושעווה'},
  {name: 'לייזר'}
];

interface serviceProp {
    getService: (service: string) => void;
};

export default function Services({ getService }: serviceProp) {

  const onServicePressed = (service: string) => {
      
      getService(service);
  }

//   const animationValue = useSharedValue(-8, {stiffness: 80});

//   const startAnimation = () => {
//       animationValue.value = withSpring(0, {});
//   };

//   useEffect(() => {
//       startAnimation();
//   }, []);

//   const animatedStyle = useAnimatedStyle(() => {
//       return {
//           transform: [{ translateY: animationValue.value * 50}],
//       };
//   });
    return(
        <View style={styles.container}>
          {/* <Animated.View style={animatedStyle}> */}
          <View style={{paddingBottom: 40}}>
         <Text style={styles.header}>איזה טיפול תרצה לבחור?</Text>
        {servicesArray.map((item, index) => (
              <TouchableOpacity  
                    activeOpacity={0.5}
                    key={index} 
                    style={styles.btn}
                    onPress={() => onServicePressed(item.name)}>
                    <Text style={styles.btnText}>{item.name}</Text>
              </TouchableOpacity>
          ))}
          {/* <Button title={'המשך'}/> */}
          </View>
          {/* </Animated.View> */}
        </View>
    )
  };

// const Service = (props) => {
//   return (
//     <Pressable activeOpacity={0.9} onPress={props.onPress}>
//       <View style={[{backgroundColor: props.color}, styles.btn]} >
//         <Text style={styles.btnText}>{props.text}</Text>
//       </View>     
//     </Pressable>
//   )
// }


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    marginTop: 15,
   
  },
  icon: {
    position:'absolute', 
    zIndex: 999, 
    alignSelf: 'flex-start', 
    marginTop: 5,
    marginLeft: 5,
  }, 
  header: {
    fontSize: 18,
    fontWeight: '300',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 16,
    color: '#000'
  },
  btn: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 20,
    width: 140,
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 300,
    color: '#000',
    alignSelf: 'center',
  },
});