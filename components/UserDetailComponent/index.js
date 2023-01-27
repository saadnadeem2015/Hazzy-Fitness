import React from "react";
import { View } from "react-native";
import { Text } from "react-native";
import FastImage from "react-native-fast-image";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";

const UserDetailsComponent = ({name,url}) =>{
    return(
        <View style={{flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between',borderBottomColor:WHITE_COLOR,borderBottomWidth:0.5,paddingVertical:20,marginBottom:20}}>
            <Text style={[{color:PRIMARY_COLOR,fontSize:28},globalStyles.regular]}>Hello, {name}</Text>
            <FastImage style={{height:60,width:60,borderRadius:30}} source={{uri:url}}/>
        </View>
    )
}

export default React.memo(UserDetailsComponent);