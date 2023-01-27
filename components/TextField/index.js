import React, { useState } from "react";
import {PRIMARY_COLOR,WHITE_COLOR} from '../../assets/colors'
import { View,TextInput,Text,StyleSheet,Image, Pressable } from "react-native";
import { Icon } from "react-native-elements";

const TextField = (props)=>{
    const {lable,style,cStyle,icon,onPress,editable=true,value="",isIcon=true,onIconPress=()=>{}} = props;
    const [isFocused,setFocused] = useState(false);
    return(
        <Pressable onPress={onPress? onPress:()=>{}} style={[styles.container,cStyle]}>
            <Text style={{color:WHITE_COLOR,marginVertical:5,fontSize:16}}>{lable}</Text>
            <View style={[{width:'100%',height:48,alignSelf:'center',flexDirection: "row",justifyContent:'flex-start',borderRadius:6,borderColor:isFocused?PRIMARY_COLOR:WHITE_COLOR,borderWidth:2},style]}>
                <TextInput value={value} editable={editable} onFocus={(e)=>{setFocused(true)}} onBlur={()=>{setFocused(false)}} style={{flex:1,marginHorizontal:10,color:WHITE_COLOR}} autoCapitalize='none' {...props}/>
                {isIcon &&<Icon
                    onPress={onIconPress}
                    type="font-awesome-5"
                    name={icon}
                    size={14}
                    color={isFocused?PRIMARY_COLOR:WHITE_COLOR}
                    containerStyle={{alignSelf:'center',margin:10}}
                     />}
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

export default React.memo(TextField);