import { mapErrorMessage } from "@modules/login/auth/utils";
import { useNavigation } from "@react-navigation/native";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { PRIMARY_COLOR } from "../../assets/colors";
import FillButton from "../../components/FillButton";
import KeyboardAvoidingViewCustom from "../../components/KeyboardAvoidingViewCustom";
import Loading from "../../components/Loading";
import TextField from "../../components/TextField";
import { authForgotPassword } from "../../slices/authSlice";

const ForgotPasswordScreen =()=>{
    const navigation = useNavigation();
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const [email,setEmail] = useState("");

    const forgotPassword = async() =>{
        if(email==""){
            Alert.alert("Alert!!","Please enter valid email");
            return
        }
        try {
            setLoading(true)
            let res = await unwrapResult(await dispatch(authForgotPassword(email)))
            setLoading(false);
            navigation.navigate('Token')
        } catch (error) {
            setLoading(false);
            Alert.alert("Error!!",mapErrorMessage(error)?.message);
        }
    }

    return(
        <KeyboardAvoidingViewCustom style={{ flex: 1,backgroundColor:"#000" }}>
            <TextField value={email} keyboardType="email-address" onChangeText={setEmail} lable="Email" icon="envelope"/>
            <FillButton title={"Reset Password"} onPress={forgotPassword} style={{backgroundColor:PRIMARY_COLOR,marginTop:312,width:'90%',height:50}}/>
            {loading && <Loading/>}
        </KeyboardAvoidingViewCustom>
    );
}

export default ForgotPasswordScreen;