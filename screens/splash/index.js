import React, { useCallback, useEffect, useState } from "react";
import { View,Text, Modal,ActivityIndicator } from "react-native";
import BackgroundImage from "../../components/BackgroundImage";
import { BackgroundImg } from "../../assets/images";
import styles from "./styles";
import FillButton from "../../components/FillButton";
import { PRIMARY_COLOR } from "../../assets/colors";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { authProfile } from "../../slices/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { globalStyles } from "../../assets/fonts";
//import { getUserById, slice } from "../../store"

const SignUpSignInPromptDialog = ({modalVisible,dismiss})=>{
    const navigation = useNavigation();
    return(
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
            <View style={{backgroundColor:'transparent',flex:1,justifyContent:'flex-end'}}>
                <View style={{height:'33%',width:'100%',backgroundColor:'rgba(255,255,255,0.2)',borderTopRightRadius:40,borderTopLeftRadius:40}}>
                    <Text style={{fontSize:16,color:'#fff',marginHorizontal:'10%',marginTop:35}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                    <FillButton title={'Sign Up'} onPress={()=>{dismiss(true);navigation.navigate('AuthStack',{ screen: 'Sign Up' })}} style={{backgroundColor:PRIMARY_COLOR,marginTop:43}}/>
                    <FillButton title={'Log In'} onPress={()=>{dismiss(true);navigation.navigate('AuthStack',{ screen: 'LogIn' })}} style={{backgroundColor:'#fff',marginTop:26}}/>
                </View>
            </View>
        </Modal>
    )
}

export const SplashScreen = () =>{
    const dispatch = useDispatch();
    const [isLoading,setLoading] = useState(true);
    
    useFocusEffect(useCallback(()=>{
        setTimeout(()=>{
            setLoading(false);
        },3000);
    },[]));

    const getUserInfo = async() =>{
        try {
            let res = await unwrapResult(await dispatch(authProfile()));
        } catch (error) {
            
        }
    }
    
    return (
            <BackgroundImage src={BackgroundImg} mode="cover">
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style={[styles.largeText,globalStyles.regular]}>CARVE</Text>
                    <Text style={[styles.smallText,globalStyles.regular]}>YOUR BODY</Text>
                    <SignUpSignInPromptDialog modalVisible={!isLoading} dismiss={(value)=>{setLoading(value)}}/>
                </View>

                {isLoading && <View style={{position:'absolute',height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                </View>}
            </BackgroundImage>
    )
}
export default SplashScreen;
