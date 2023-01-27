import React from "react";
import { Text, TextInput, View } from "react-native";
import { WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";

const PaymentInputComponent = (props)=>{
    const {label,value,leftValue,containerStyle} = props;
    return(
        <View style={containerStyle}>
            <Text style={[{color:WHITE_COLOR,fontSize:10,marginBottom:5},globalStyles.regular]}>{label}</Text>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <TextInput style={[{color:WHITE_COLOR,fontSize:14,flex:1},globalStyles.regular]} {...props}/>
                {leftValue && <Text style={[{color:WHITE_COLOR,fontSize:14},globalStyles.regular]}>{leftValue}</Text>}
            </View>
        </View>
    )
}

export default PaymentInputComponent;