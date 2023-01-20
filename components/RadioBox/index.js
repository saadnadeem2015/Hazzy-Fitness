import React, { Children, useEffect } from "react";
import { View, Image, Pressable } from "react-native";
import { Checked, Unchecked } from "../../assets/images";

const RadioBox = ({isChecked,children,style,onPress=()=>{}})=>{
    return(
        <Pressable onPress={onPress} style={style}>
            <View style={{height:20,width:20,margin:5}}>
                        {isChecked ? <Image source={Checked}/>
                        : <Image source={Unchecked}/>}
                        
            </View>
            {children}
        </Pressable>
        
    );
}

export default React.memo(RadioBox);