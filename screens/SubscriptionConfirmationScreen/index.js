import { useHeaderHeight } from "@react-navigation/stack";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { BLACK_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";
import FillButton from "../../components/FillButton";
import KeyboardAvoidingViewCustom from "../../components/KeyboardAvoidingViewCustom";
import Loading from "../../components/Loading";
import PaymentInputComponent from "../../components/PaymentInputComponent";
import { subscribePlan } from "../../slices/subscriptionSlice";

const SubscriptionConfirmationScreen = ({navigation,route}) =>{
    const {card,subs} = route.params;
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const subscribe = async()=>{
        try {
            setLoading(true);
            let data = {
                "plan_id": subs?.id,
                "card_id": card?.stripe_id
            }
            let res = await unwrapResult(await dispatch(subscribePlan(data)))
            setLoading(false);
            Alert.alert("Success!!","You have subscribed Hazzy Fitness subscriptions",[{ text: "OK", onPress: () =>{navigation.navigate("HomeScreenTabs")} }])
        } catch (error) {
            setLoading(false);
            Alert.alert("Error!!",mapErrorMessage(error)?.message);
        }
    }
    return(
        <KeyboardAvoidingViewCustom style={{flex:1,backgroundColor:BLACK_COLOR}} keyboardVerticalOffset={useHeaderHeight()}>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,alignSelf:'center',width:'90%'}} contentContainerStyle={{paddingVertical:20}}>
                <View style={{width:'95%',alignSelf:'center',backgroundColor:"rgba(255,255,255,0.2)",padding:17,borderRadius:8,marginVertical:15}}>
                    <Text style={[{color:PRIMARY_COLOR,fontSize:14},globalStyles.regular]}>Message</Text>
                    <Text style={[{color:WHITE_COLOR,fontSize:10,marginVertical:5},globalStyles.regular]}>{subs?.description}</Text>
                </View>
                <View style={{width:'94%',marginVertical:20}}>
                    <Text style={[{color:PRIMARY_COLOR,fontSize:18},globalStyles.regular]}>Payment completed</Text>
                </View>
                <PaymentInputComponent containerStyle={{width:'94%',borderBottomColor:WHITE_COLOR,borderBottomWidth:0.3,padding:8}} editable={true} value="Total" label="Amount" leftValue={subs?.total_price+"$"}/>

                <View style={{width:'94%',marginVertical:20}}>
                    <Text style={[{color:PRIMARY_COLOR,fontSize:18},globalStyles.regular]}>Subscription tier</Text>
                </View>
                <PaymentInputComponent containerStyle={{width:'94%',borderBottomColor:WHITE_COLOR,borderBottomWidth:0.3,padding:8}} editable={true} value={subs?.plan_name+" plan"} label="Details"/>

                <FillButton title={"Confirm"} onPress={subscribe} style={{backgroundColor:PRIMARY_COLOR,marginVertical:40,width:'94%',height:44}}/>
            </ScrollView>
            {loading && <Loading/>}
        </KeyboardAvoidingViewCustom>
    )
}

export default SubscriptionConfirmationScreen;