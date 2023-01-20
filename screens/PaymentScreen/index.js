import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, ScrollView, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { BLACK_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";
import CardComponent from "../../components/CardComponent";
import FillButton from "../../components/FillButton";
import KeyboardAvoidingViewCustom from "../../components/KeyboardAvoidingViewCustom";
import PaymentInputComponent from "../../components/PaymentInputComponent";
import { getPreviousCards } from "../../slices/subscriptionSlice";
import moment from 'moment';
import Loading from "../../components/Loading";
const PaymentScreen = ({navigation,route})=>{
    const {subs} = route.params;
    const [loading,setLoading] = useState(false);
    const {width} = Dimensions.get('screen');
    const dispatch = useDispatch();
    const [savedCard,setSavedCard] = useState([]);
    const [selectedCard,setSelectedCard] = useState({});
    useEffect(()=>{
        getSavedCards();
    },[])

    const getSavedCards = async() =>{
        try {
            setLoading(true);
            let res = await unwrapResult(await dispatch(getPreviousCards()));
            setLoading(false);
            if(res.length==0){
                setSavedCard([{}]);
            } else {
                setSavedCard(res);
            }
            
        } catch (error) {
            setLoading(false);
            Alert.alert("Error!!",mapErrorMessage(error)?.message);
        }
    }

    const goToPaymentConfirm = ()=>{
        if(!selectedCard?.id){
            Alert.alert("Alert!!","Please choose your Card for payment.")
            return;
        }

        navigation.navigate("SubscriptionConfirmationScreen",{card:selectedCard,subs:subs});
    }

    return(
        <KeyboardAvoidingViewCustom style={{flex:1,backgroundColor:BLACK_COLOR}}>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}} contentContainerStyle={{paddingBottom:30}}>
                <Text style={[{fontSize:40,color:WHITE_COLOR,alignSelf:"center",marginTop:20},globalStyles.regular]}>${subs?.monthly_price}</Text>
                <Text style={[{fontSize:12,color:PRIMARY_COLOR,alignSelf:"center",marginVertical:5},globalStyles.regular]}>{subs?.sub_type}</Text>
                <View style={{height:1,width:'94%',alignSelf:"center",backgroundColor:WHITE_COLOR,marginVertical:10}}/>
                <View style={{width:'90%',alignSelf:'center'}}>
                    <Text style={[{fontSize:16,color:PRIMARY_COLOR,alignSelf:"flex-start",marginVertical:5,paddingHorizontal:7},globalStyles.regular]}>{subs?.plan_name+ " subscriptions"}</Text>
                    <PaymentInputComponent containerStyle={{borderBottomColor:WHITE_COLOR,borderBottomWidth:0.3,padding:8}} editable={false} value={subs?.sub_type} label="Details" leftValue={subs?.monthly_price+"$"}/>
                    <PaymentInputComponent containerStyle={{borderBottomColor:WHITE_COLOR,borderBottomWidth:0.3,padding:8}} editable={false} value={moment().format("DD. MMMM. yyyy")} label="Date of payment"/>
                    <PaymentInputComponent containerStyle={{padding:8}} editable={false} value="Number of days" label="Validity" leftValue={subs?.duration_days}/>
                </View>
                <View style={{height:1,width:'94%',alignSelf:"center",backgroundColor:WHITE_COLOR,marginVertical:10}}/>
                <View style={{width:'90%',alignSelf:'center',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={[{fontSize:18,color:PRIMARY_COLOR,alignSelf:"flex-start",marginVertical:5,paddingHorizontal:7},globalStyles.regular]}>Payment</Text>
                    <Text onPress={()=>{navigation.navigate("SaveCardScreen")}} style={[{fontSize:12,color:PRIMARY_COLOR,alignSelf:"flex-start",marginVertical:5,paddingHorizontal:7},globalStyles.regular]}>+ Add New Card</Text>
                    
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} style={{width:'100%'}} horizontal={true} contentContainerStyle={{paddingStart:width*0.2}}>
                    {
                    savedCard?.map(item=> <CardComponent onPress={item=>setSelectedCard(item)} card={item}/>) 
                    }
                </ScrollView>
                <View style={{height:1,width:'94%',alignSelf:"center",backgroundColor:WHITE_COLOR,marginVertical:10}}/>
                <View style={{width:'94%',alignSelf:'center'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={[{fontSize:18,color:PRIMARY_COLOR,alignSelf:"flex-start"},globalStyles.regular]}>Details</Text>
                        <Icon style={{}} type='font-awesome' name="angle-right" color={PRIMARY_COLOR}/>
                    </View>
                    <View style={{marginHorizontal:7}}>
                        <PaymentInputComponent containerStyle={{borderBottomColor:WHITE_COLOR,borderBottomWidth:0.3,padding:8}} editable={false} value={selectedCard?.card_number} label="Card number"/>
                        <PaymentInputComponent containerStyle={{borderBottomColor:WHITE_COLOR,borderBottomWidth:0.3,padding:8}} editable={false} value={selectedCard?.expiry_date_month?selectedCard?.expiry_date_month+"/"+selectedCard?.expiry_date_year:""} label="Exparation date"/>
                        
                        <PaymentInputComponent containerStyle={{borderBottomColor:WHITE_COLOR,borderBottomWidth:0.3,padding:8}} editable={false} value={selectedCard?.card_holder_name} label="Card holder name"/>
                    </View>
                </View>

                <FillButton title={"Confirm"} onPress={goToPaymentConfirm} style={{backgroundColor:PRIMARY_COLOR,marginVertical:15,width:'84%',height:50}}/>
            </ScrollView>
            {loading && <Loading/>}
        </KeyboardAvoidingViewCustom>
    )
}

export default PaymentScreen;