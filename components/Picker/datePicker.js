import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import DatePicker from 'react-native-date-picker'
import { Modal, View,Text, Pressable } from "react-native";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";

const ImagePicker = ({preSetDate,setDate,visible,onClosePress}) => {
    const [date,setD]=useState(new Date());
    const onDateChange = (date)=>{
        setD(date);
        setDate(date);
    }
    return(
        <Modal animationType="slide"
        transparent={true}
        visible={visible}>
            <View style={{flex:1,justifyContent:'flex-end',alignItems:'center',backgroundColor:'transparent'}}>
                <Pressable style={{flex:1,width:'100%'}} onPress={onClosePress}/>
                <View style={{width:'100%',alignSelf:'center',backgroundColor:'#333333',paddingBottom:25,
                paddingTop:15,paddingHorizontal:25,borderTopLeftRadius:30,borderTopRightRadius:30}}>
                    <View  style={{width:'96%',alignSelf:'center',marginBottom:5,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text onPress={onClosePress} style={[{color:WHITE_COLOR,fontSize:15},globalStyles.semiBold]}>Cancel</Text>
                        <Text onPress={onClosePress} style={[{color:PRIMARY_COLOR,fontSize:15},globalStyles.semiBold]}>Set</Text>
                    </View>
                    <View style={{width:'96%',alignSelf:'center',backgroundColor:'#333333',paddingHorizontal:25,paddingVertical:5,borderColor:PRIMARY_COLOR,borderWidth:1}}>
                        <Text style={[{color:PRIMARY_COLOR,fontSize:24},globalStyles.semiBold]}>Birthday</Text>
                        <Text style={{color:WHITE_COLOR,fontSize:14}}>Choose your birthday (month, day,year)</Text>
                        {/* <Text style={{color:WHITE_COLOR,fontSize:18,marginVertical:10,color:PRIMARY_COLOR,alignSelf:'center'}}></Text> */}
                        <DatePicker androidVariant={"iosClone"} maximumDate={new Date()} textColor={PRIMARY_COLOR} mode="date" date={date} onDateChange={onDateChange}/>
                    </View>
                </View>
            </View>

        </Modal>
        
    )
}

export default ImagePicker;
/*  */
                
            /*  */