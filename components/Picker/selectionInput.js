import React, { useState } from "react";
import {PRIMARY_COLOR,WHITE_COLOR} from '../../assets/colors'
import { View,TextInput,Text,StyleSheet,Image, Pressable } from "react-native";
import { Icon } from "react-native-elements";

const SelectionField = ({lable,value,style,icon,onPress,editable=false})=>{
    return(
        <Pressable onPress={onPress? onPress:()=>{}} style={styles.container}>
            <Text style={{color:WHITE_COLOR,marginVertical:5,fontSize:16}}>{lable}</Text>
            <View accessible={false} style={[{width:'100%',height:48,alignSelf:'center',flexDirection: "row",justifyContent:'flex-start',alignItems:'center',borderRadius:6,borderColor:editable?PRIMARY_COLOR:WHITE_COLOR,borderWidth:2},style]}>
                <Text style={{flex:1,marginHorizontal:10,color:editable?PRIMARY_COLOR:WHITE_COLOR}}>{value}</Text>
                <Icon
                    accessible={false}
                    type="font-awesome-5"
                    name={icon}
                    size={14}
                    color={editable?PRIMARY_COLOR:WHITE_COLOR}
                    containerStyle={{alignSelf:'center',margin:10}}
                     />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        height:80,
        width:'90%',
        alignSelf:'center',
        justifyContent:'flex-start'
    }
});

export default React.memo(SelectionField);