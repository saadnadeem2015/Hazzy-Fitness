import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";

const MenuButton = ({icon,label,onPress})=>{
    return(
        <Pressable onPress={onPress} style={{flexDirection:'row',justifyContent:'space-between',borderBottomColor:WHITE_COLOR,borderBottomWidth:0.5,paddingVertical:10,marginVertical:5}}>
            <Text style={[{marginLeft:10,color:WHITE_COLOR,fontSize:16},globalStyles.regular]}>{label}</Text>
            <Image style={{height:20,width:20}} source={icon} resizeMode="contain"/>
        </Pressable>
    )
}

export default React.memo(MenuButton);