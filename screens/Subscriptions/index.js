import { useHeaderHeight } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import FastImage from "react-native-fast-image";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { BLACK_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";
import { BackgroundImg } from "../../assets/images";
import BackgroundContainer from "../../components/BackgroundImage";
import KeyboardAvoidingViewCustom from "../../components/KeyboardAvoidingViewCustom";
import UserDetailComponent from "../../components/UserDetailComponent";
import FillButton from "../../components/FillButton";
import { unwrapResult } from "@reduxjs/toolkit";
import { getSubscriptionPlans } from "../../slices/subscriptionSlice";
import Loading from "../../components/Loading";
import Video from "react-native-video";
const {width} = Dimensions.get('screen');
const MediaPlay = ({item}) =>{
    const [pause,setPause] = useState(true);
    return(
        <Pressable onPress={()=>{setPause(!pause)}} style={{width:(width*0.9),height:200,marginVertical:15,alignSelf:'center',borderRadius:8,justifyContent:'center',alignItems:'center',overflow:'hidden',backgroundColor:"rgba(0,0,0,0.3)"}}>
            <Video paused={pause} resizeMode="cover" style={{width:(width*0.9),height:'100%',marginVertical:15,alignSelf:'center',borderRadius:8,justifyContent:'center',alignItems:'center',position:'absolute',top:0}} source={{uri:item?.media}}/>
            {pause && <IconFontAwesome size={60} color={PRIMARY_COLOR+"AA"} name="youtube-play"/>}
        </Pressable>
    )
}

const Subscriptions = ({navigation})=>{
    const [activeIndexNumber,setActiveIndexNumber] = useState(0);
    const [loading,setLoading] = useState(false);
    
    const dispatch = useDispatch();
    const user = useSelector(state=>state?.auth?.me);
    const [subs,setSubs] = useState([]);
    const [selectedSubs,setSelectedSubs] = useState({});

    useEffect(()=>{
        getSubs();
    },[]);

    const getSubs = async()=>{
        try {
            setLoading(true);
            let res = await unwrapResult(await dispatch(getSubscriptionPlans()));
            setSubs(res);
            setSelectedSubs(res[0])
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
            Alert.alert("Error!!",mapErrorMessage(error)?.message);
        }
    }

    

    return(
        <BackgroundContainer src={BackgroundImg} mode="cover" style={{flex:1}}>
            <ScrollView style={{marginTop:useHeaderHeight()+10,alignSelf:'center',width:'90%'}}>
                <UserDetailComponent name={user?.name.split(" ")[0]} url={user?.profile_image}/>
                <View style={{width:'60%',backgroundColor:PRIMARY_COLOR,height:40,borderRadius:10,alignSelf:'center',overflow:'hidden',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
                    {subs?.map(item=>{return <Pressable onPress={()=>{setSelectedSubs(item)}} style={[{backgroundColor:PRIMARY_COLOR,height:32,width:'46%',alignItems:'center',justifyContent:'center',borderRadius:10},selectedSubs?.plan_name==item?.plan_name && {backgroundColor:BLACK_COLOR,height:32,width:'46%',alignItems:'center',justifyContent:'center',borderRadius:10}]}>
                        <Text style={[{color:selectedSubs?.plan_name==item?.plan_name ?PRIMARY_COLOR:BLACK_COLOR},globalStyles.regular]}>{item?.plan_name}</Text>
                    </Pressable>})}
                    {/* <View style={{backgroundColor:BLACK_COLOR,height:32,width:'46%',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                        <Text style={[{color:PRIMARY_COLOR},globalStyles.regular]}>Premium</Text>
                    </View> */}
                </View>

                {selectedSubs?.id && 
                <>
                    
                    <ScrollView scrollEventThrottle={32} onScroll={e => {
            let slide = Math.round(
            e.nativeEvent.contentOffset.x /
            e.nativeEvent.layoutMeasurement.width);
            if (slide !== activeIndexNumber) {
            setActiveIndexNumber(slide); //here we will set our active index num
            }}} horizontal={true} snapToInterval={(width*0.9)} snapToAlignment={"center"} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
                    {selectedSubs?.plan_media?.map(item=>
                        <MediaPlay item={item}/>
                    )}
                    </ScrollView>
                    <View style={{flexDirection:'row',width:'10%',justifyContent:'space-evenly',alignSelf:'center'}}>
                        {
                            selectedSubs?.plan_media?.map((item,index)=><View style={{width:10,height:10,borderRadius:5,backgroundColor:activeIndexNumber ==index?PRIMARY_COLOR:PRIMARY_COLOR+"AA" }}/>)
                        }
                        
                        {/* <View style={{width:10,height:10,borderRadius:5,backgroundColor:PRIMARY_COLOR+"AA"}}/> */}
                    </View>

                    <View style={{width:'95%',alignSelf:'center',backgroundColor:"rgba(255,255,255,0.2)",padding:17,borderRadius:8,marginVertical:15}}>
                        <Text style={[{color:PRIMARY_COLOR,fontSize:14},globalStyles.regular]}>{selectedSubs?.short_name}</Text>
                        <Text style={[{color:WHITE_COLOR,fontSize:10,marginVertical:5},globalStyles.regular]}>{selectedSubs?.description}</Text>
                    </View>
                    <FillButton title={"Subscribe"} onPress={()=>{navigation.navigate("PaymentScreen",{subs:selectedSubs})}} style={{backgroundColor:PRIMARY_COLOR,marginVertical:15,width:'90%',height:50}}/>
                </>}
            </ScrollView>
            {loading && <Loading/>}
        </BackgroundContainer>
    )
}

export default Subscriptions;