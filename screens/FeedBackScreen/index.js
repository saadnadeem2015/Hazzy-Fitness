import { mapErrorMessage } from "@modules/login/auth/utils";
import { useHeaderHeight } from "@react-navigation/stack";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { BLACK_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import FillButton from "../../components/FillButton";
import KeyboardAvoidingViewCustom from "../../components/KeyboardAvoidingViewCustom";
import Loading from "../../components/Loading";
import TextField from "../../components/TextField";
import { sendFeedback } from "../../slices/authSlice";

const FeedBackScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");
    useEffect(()=>{
        navigation.setOptions({
            title: "Feedback",
        });
    },[]);

    const postFeedback = async() =>{
        try {
            setLoading(true);
            let data={email,message};
            let res = await unwrapResult(await dispatch(sendFeedback(data)));
            Alert.alert("Success!!","Your feedback is updated. We will check and update you later.")
            setLoading(false);
        } catch (error) {
            setLoading(false);
            Alert.alert("Error!!",mapErrorMessage(error)?.message);
            
        }
    }

    return(
        <KeyboardAvoidingViewCustom style={{flex:1,backgroundColor:BLACK_COLOR}}>
            <ScrollView style={{width:'100%',alignSelf:'center'}} showsVerticalScrollIndicator={false} contentContainerStyle={{height:'100%',paddingBottom:useHeaderHeight()+20,paddingTop:20}}>
                <TextField value={email} onChangeText={setEmail}  lable="Email" icon="envelope"/>
                <TextField value={message} onChangeText={setMessage}  lable="Message" icon="envelope" isIcon={false} placeholder="Type something..." placeholderTextColor={WHITE_COLOR} multiline={true} numberOfLines={10} cStyle={{height:150}} style={{height:118,padding:5,color:WHITE_COLOR}} />
                <View style={{flex:1,justifyContent:'flex-end'}}>
                    <FillButton title={"Submit"} onPress={postFeedback} style={{backgroundColor:PRIMARY_COLOR,marginTop:90,width:'90%',height:50}}/>
                </View>
            </ScrollView>
            {loading && <Loading/>}
        </KeyboardAvoidingViewCustom>
    )
}

export default FeedBackScreen;