import React from "react";
import { Pressable, View,Image,Text } from "react-native";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";

const SocialLogin = ({lable,icon,onPress})=>{
    return(
        <Pressable onPress={onPress} style={{width:'90%',marginBottom:10,height:50,justifyContent:'center',flexDirection:'row',alignItems:'center',alignSelf:'center',borderColor:PRIMARY_COLOR,borderWidth:1,borderRadius:5}}>
            <View style={{position:'absolute',start:12,justifyContent:'center',width:17,height:17,alignSelf:'center'}}>
                <Image source={icon}/>
            </View>
            <Text style={{alignSelf:'center',color:WHITE_COLOR,fontSize:16}}>{lable}</Text>
        </Pressable>
    );
}
export default SocialLogin;