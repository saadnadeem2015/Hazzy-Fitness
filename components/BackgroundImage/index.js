import React from "react";
import { ImageBackground, View } from "react-native";

const BackgroundContainer = ({src,style,mode,children}) =>{
    return (<ImageBackground source={src} style={{flex:1}}>
        <View style={{flex:1,backgroundColor:"rgba(0,0,0,0.6)"}}>
        {children}
        </View>
    </ImageBackground>)
}

export default BackgroundContainer;