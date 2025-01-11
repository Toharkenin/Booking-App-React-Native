import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function HeaderTabs(props) {
    return (
    <View style={{marginTop: 20}}>
        <View style={{flexDirection: "row", alignSelf: "center", paddingVertical: 15}}>
        <HeaderButton 
                text="הגדר תאריך"
                activeBtn={props.activeBtn}
                setActiveBtn={props.setActiveBtn} /> 
            <HeaderButton 
                text="חסום תורים" 
                activeBtn={props.activeBtn}
                setActiveBtn={props.setActiveBtn} />
            </View>
    </View>
    );
  };


  const HeaderButton = (props) => {
    return (
    <TouchableOpacity
            style={{
                backgroundColor: props.activeBtn === props.text ? '#C19203' : '#fff',
                paddingVertical: 6,
                paddingHorizontal: 16,
                borderRadius: 20,
            }}
            onPress={() => props.setActiveBtn(props.text)}>
        <Text 
            style={{
                color: props.activeBtn === props.text ? '#fff' : '#C19203',
                fontSize: 15,
                fontWeight: "bold",
            }}>
               {props.text}
        </Text>
    </TouchableOpacity>
    );
  };