import { useNavigation } from "@react-navigation/native";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { Image,Text } from "react-native";
import { useDispatch } from "react-redux";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";
import { PASSWORD_SUCESS } from "../../assets/images";
import FillButton from "../../components/FillButton";
import KeyboardAvoidingViewCustom from "../../components/KeyboardAvoidingViewCustom";
import TextField from "../../components/TextField";
import { authForgotPassword } from "../../slices/authSlice";

const PasswordSetSuccessFull =()=>{
    const navigation = useNavigation();

    return(
        <KeyboardAvoidingViewCustom style={{ flex: 1,backgroundColor:"#000"}}>
            <Image source={PASSWORD_SUCESS} style={{width:100,alignSelf:'center'}} resizeMode="contain"/>
            <Text style={[{color:WHITE_COLOR,alignSelf:'center',fontSize:30,textAlign:'center'},globalStyles.regular]}>{"Password reset\nsuccesful"}</Text>
            <Text style={[{color:WHITE_COLOR,alignSelf:'center',lineHeight:20,fontSize:14,textAlign:'center',paddingHorizontal:30,marginVertical:26},globalStyles.regular]}>You have successfully reset your password. Please use your new password when you’re logging in</Text>
            <FillButton title={"Back"} onPress={()=>{navigation.navigate("Login")}} style={{backgroundColor:WHITE_COLOR,marginTop:70,width:'90%',height:50}}/>
        </KeyboardAvoidingViewCustom>
    );
}

export default PasswordSetSuccessFull;