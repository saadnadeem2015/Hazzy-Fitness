import React from "react";
import { TouchableOpacity,Text } from "react-native";
import { globalStyles } from "../../assets/fonts";

const FillButton = ({title,style,onPress,textStyle={}})=>{
    return(
        <TouchableOpacity onPress={onPress} style={[{width:"80%",height:50,alignSelf:'center',alignItems:'center',justifyContent:'center',borderRadius:6},style]}>
            <Text style={[{textAlign:'center'},globalStyles.regular,textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default React.memo(FillButton);