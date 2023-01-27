import { mapErrorMessage } from "@modules/login/auth/utils";
import { useHeaderHeight } from "@react-navigation/stack";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { BLACK_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";
import CardComponent from "../../components/CardComponent";
import FillButton from "../../components/FillButton";
import KeyboardAvoidingViewCustom from "../../components/KeyboardAvoidingViewCustom";
import Loading from "../../components/Loading";
import PaymentInputComponent from "../../components/PaymentInputComponent";
import { setNewCards } from "../../slices/subscriptionSlice";
const SaveCardScreen = ({navigation}) =>{
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const [cardNum,setCardNum] = useState("");
    const [exDate,setExDate] = useState("");
    const [cvv,setCVV] = useState("");
    const [cardHolderName,setCardHolderName] = useState("");

    const saveCard = async()=>{

        if(cardNum==""){
            Alert.alert("Alert!!","Enter a valid card num.")
            return;
        }
        
        if(exDate.split("/").length < 2){
            Alert.alert("Alert!!","Enter a valid expiration date.")
            return;
        }

        if(cvv==""){
            Alert.alert("Alert!!","Enter a valid card cvv.")
            return;
        }
        if(cardHolderName==""){
            Alert.alert("Alert!!","Enter a valid card holder name.")
            return;
        }

        setLoading(true);
        try {
            const data = {
                "card_number": cardNum,
                "expiration_month": exDate.split("/")[0],
                "expiration_year": exDate.split("/")[1],
                "security_code": cvv,
                "card_holder": cardHolderName
            }
            let res = await unwrapResult(await dispatch(setNewCards(data)));
            setLoading(false);
            Alert.alert("Success!!","Card is added successfully.",[{ text: "OK", onPress: () =>{navigation.goBack} }])
        } catch (error) {
            console.log(error)
            setLoading(false);
            Alert.alert("Error!!",mapErrorMessage(error)?.message);
        }
    }

    const setDate=(txt)=>{
        if(exDate.length==2 && txt.length>2){
            txt.split("")
            setExDate(exDate+"/"+txt.split("").pop());
        } else {
            setExDate(txt)
        }
    }

    return(
        <KeyboardAvoidingViewCustom style={{flex:1,backgroundColor:BLACK_COLOR}} keyboardVerticalOffset={useHeaderHeight()}>
            <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:useHeaderHeight(),alignItems:'center'}}>
                <View style={{width:'90%',alignSelf:'center',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginVertical:30}}>
                    <Text style={[{fontSize:18,color:PRIMARY_COLOR,alignSelf:"flex-start",marginVertical:5,paddingHorizontal:7},globalStyles.regular]}>Add new card</Text>
                    <Text style={[{fontSize:12,color:WHITE_COLOR,alignSelf:"flex-start",marginVertical:5,paddingHorizontal:7},globalStyles.regular]}>+ Add New Card</Text>
                    
                </View>
                <CardComponent/>
                <View style={{width:'94%',marginVertical:20}}>
                    <Text style={[{color:PRIMARY_COLOR,fontSize:18},globalStyles.regular]}>Details</Text>
                </View>
                <PaymentInputComponent keyboardType="number-pad" value={cardNum} onChangeText={setCardNum} containerStyle={{width:'94%',borderBottomColor:WHITE_COLOR,borderBottomWidth:0.3,padding:8}} editable={true} label="Card number"/>
                <PaymentInputComponent  maxLength={5} keyboardType="number-pad" placeholderTextColor={WHITE_COLOR+"AA"} placeholder="mm/yy" value={exDate} onChangeText={text=>{setDate(text)}} containerStyle={{width:'94%',borderBottomColor:WHITE_COLOR,borderBottomWidth:0.3,padding:8}} editable={true} label="Exparation date"/>
                <PaymentInputComponent keyboardType="number-pad" value={cvv} onChangeText={setCVV}   containerStyle={{width:'94%',borderBottomColor:WHITE_COLOR,borderBottomWidth:0.3,padding:8}} editable={true} label="CVV"/>
                <PaymentInputComponent containerStyle={{width:'94%',borderBottomColor:WHITE_COLOR,borderBottomWidth:0.3,padding:8}} editable={true} value={cardHolderName} onChangeText={setCardHolderName} label="Card holder name"/>
                <FillButton title={"Save card"} onPress={saveCard} style={{backgroundColor:PRIMARY_COLOR,marginVertical:40,width:'88%',height:44}}/>
            </ScrollView>
            {loading && <Loading/>}
        </KeyboardAvoidingViewCustom>
    )
}

export default SaveCardScreen;