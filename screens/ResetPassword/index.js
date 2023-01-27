import { mapErrorMessage } from "@modules/login/auth/utils";
import { useNavigation } from "@react-navigation/native";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import FillButton from "../../components/FillButton";
import KeyboardAvoidingViewCustom from "../../components/KeyboardAvoidingViewCustom";
import Loading from "../../components/Loading";
import TextField from "../../components/TextField";
import { authResetPassword } from "../../slices/authSlice";

const ResetPasswordScreen =({route})=>{
    const {tokenId} = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [pass,setPass] = useState('');
    const [cPass,setCPass] = useState('');
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
                <Icon onPress={()=>{navigation.navigate("Notifications")}} style={{marginRight:5}} size={15} type='font-awesome' name="bell" color={"#000000AA"}/>
            ),
          });
    },[navigation])

    const chnagePassword = async()=>{
        if(pass==""){
            Alert.alert("Alert!!","Enter a valid Password.");
            return;
        } else if(cPass=="") {
            Alert.alert("Alert!!","Enter a valid confirm Password.");
            return;
        } else if(cPass!==pass) {
            Alert.alert("Alert!!","Confirm Password is not same as Password.");
            return;
        }
        try {
            setLoading(true);
            let data = {
                "new_password": pass,
                "reset_token_id": tokenId
            }
            let res = await unwrapResult(await dispatch(authResetPassword(data)))
            setLoading(false);
            navigation.navigate("Password Reset SuccessFull")
        } catch (error) {
            setLoading(false);
            Alert.alert("Error!!",mapErrorMessage(error)?.message);
        }
    }
    return(
        <KeyboardAvoidingViewCustom style={{ flex: 1,backgroundColor:"#000" }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,marginHorizontal:20}} contentContainerStyle={{alignItems:'center',paddingTop:24}}>
                <TextField value={pass} onChangeText={setPass} lable="Set new password" icon="eye"/>
                <TextField value={cPass} onChangeText={setCPass} lable="Confirm new passowrd" icon="eye"/>
                <FillButton title={"Submit"} onPress={chnagePassword} style={{backgroundColor:PRIMARY_COLOR,marginTop:312,width:'90%',height:50}}/>
                <FillButton title={"Cancel"} onPress={()=>{navigation.goBack()}} style={{backgroundColor:WHITE_COLOR,marginTop:26,width:'90%',height:50}}/>
            </ScrollView>
            {loading && <Loading/>}
        </KeyboardAvoidingViewCustom>
    );
}

export default ResetPasswordScreen;