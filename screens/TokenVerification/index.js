import { useNavigation } from "@react-navigation/native";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { Alert, ScrollView,Text } from "react-native";
import OtpInputs from "react-native-otp-inputs";
import { useDispatch } from "react-redux";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import FillButton from "../../components/FillButton";
import KeyboardAvoidingViewCustom from "../../components/KeyboardAvoidingViewCustom";
import { authVerifyOTP } from "../../slices/authSlice";
import Loading from './../../components/Loading';

const TokenVerificationScreen = () =>{
    const [code,setCode] = useState("");
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const veriFyOTP = async()=>{
        if(code.length <4){
            Alert.alert("Alert!!","Enter a valid OTP.")
            return;
        }
        try {
            setLoading(true)
            let res = await unwrapResult(await dispatch(authVerifyOTP(code)));
            setLoading(false)
            navigation.navigate('Set Password',{tokenId:res?.id})
        } catch (error) {
            setLoading(false)
            Alert.alert("Alert!!",error?.message?error?.message:"Enter a valid OTP.")
        }
    }

    return(
        <KeyboardAvoidingViewCustom keyboardVerticalOffset={0}>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,backgroundColor:'#000'}}>
                <Text style={{fontSize:27,color:WHITE_COLOR,alignSelf:'center',marginTop:25}}>Token verification</Text>
                <Text style={{color:WHITE_COLOR,alignSelf:'center',marginTop:8}}>We sent a token to your email</Text>
                <Text style={{color:WHITE_COLOR,alignSelf:'center'}}>address! <Text style={{color:PRIMARY_COLOR,alignSelf:'center'}}>Change</Text></Text>
                <OtpInputs
                    style={{flexDirection:'row',marginLeft:15,marginTop:20,alignSelf:'center'}}
                    inputContainerStyles={{margin:5,borderRadius:8,backgroundColor:WHITE_COLOR,alignSelf:'center'}}
                    inputStyles={[{fontSize:32,height:56,width:51,textAlign:'center',paddingHorizontal:15}]}
                    //clearTextOnFocus
                    handleChange={setCode}
                    keyboardType="phone-pad"
                    numberOfInputs={4}
                    //underlineColorAndroid={PRIMARY_COLOR3}
                    selectionColor={'transparent'}
                    importantForAutofill="yes"
                    //ref={otpRef}
                    autofillFromClipboard={false}
                    //focusStyles={{borderBottomWidth:2,borderBottomColor:PRIMARY_COLOR3}}
                    />
                    <Text style={{color:WHITE_COLOR,alignSelf:'center',marginTop:24}}>Don't receive your code? <Text style={{color:PRIMARY_COLOR}}>Resend</Text></Text>
                    <FillButton title={"Submit"} onPress={veriFyOTP} style={{backgroundColor:PRIMARY_COLOR,marginTop:312,width:'80%',height:50}}/>
            </ScrollView>
            {loading && <Loading/>}
        </KeyboardAvoidingViewCustom>
    );
}

export default TokenVerificationScreen;