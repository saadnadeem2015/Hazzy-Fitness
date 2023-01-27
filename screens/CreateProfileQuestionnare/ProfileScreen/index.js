import { useHeaderHeight } from "@react-navigation/stack";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { View,ScrollView, Pressable, Alert } from "react-native";
import FastImage from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import { PRIMARY_COLOR } from "../../../assets/colors";
import { ProfilePhotoDummy } from "../../../assets/images";
import CountryPicker from "../../../components/Picker/countryPicker";
import SelectionInput from "../../../components/Picker/selectionInput";
import FillButton from "../../../components/FillButton";
import GenderCompoent from "../../../components/GenderCompoent";
import ImagePickerModal from "../../../components/ImagePicker";
import KeyboardAvoidingViewCustom from "../../../components/KeyboardAvoidingViewCustom";
import Loading from "../../../components/Loading";
import TextField from "../../../components/TextField";
import { getCountry, getGender, setAuthProfile } from "../../../slices/authSlice";

const ProfileScreen = ({navigation}) =>{
    const dispatch = useDispatch();
    const user = useSelector(state=>state?.auth?.me)
    const [fName,setFName] = useState("");
    const [lName,setLName] = useState("");
    const [loading,setLoading] = useState(false);
    const [selectedImage,setSelectedImage] = useState({});
    const [genderData,setGenderData] = useState([]);
    const [countryData,setCountryData] = useState([]);
    const [selectedGender,setSelectedGender] = useState({});
    const [selectedCountry,onSelectCountry] = useState({});
    const [imagePickerVisible,setImagePickerVisible] = useState(false);
    const [countryPickerVisible,setCountryPickerVisible] = useState(false);

    useEffect(()=>{
        getData();
    },[]);

    const getData = async ()=>{
        try {
            setLoading(true)
            let res = await unwrapResult(await dispatch(getGender()));
            setGenderData(res);
            let res2 = await unwrapResult(await dispatch(getCountry()));
            setCountryData(res2);
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }


    const onSave = async() => {
        if(fName==""){
            Alert.alert("Alert!!","Please enter a valid firstname.")
            return;
        } else if(lName==""){
            Alert.alert("Alert!!","Please enter a valid lastname.")
            return;
        } else if(!selectedGender?.id){
            Alert.alert("Alert!!","Please select your gender.")
            return;
        } else if(!selectedCountry?.id){
            Alert.alert("Alert!!","Please select your country.")
            return;
        }
        try {
            setLoading(true);
            let data = {
                "name": fName+ " " + lName,
                "gender_id": selectedGender?.id,
                "country_id": selectedCountry?.id
            }
            let payload = {
                id:user?.id,
                data:data
            }
            let res = await unwrapResult(await dispatch(setAuthProfile(payload)));
            setLoading(false);
            if(res){
                navigation.replace("HomeScreenTabs")
            }
            
        } catch (error) {
            setLoading(false);
            Alert.alert("Error!!",error?.message);
        }
    }

    return(<KeyboardAvoidingViewCustom style={{flex:1,width:"100%",backgroundColor:'#000',alignItems:'center'}} keyboardVerticalOffset={useHeaderHeight()} >
        <ScrollView style={{flex:1,width:"100%"}} contentContainerStyle={{alignItems:'center'}}>
            <Pressable onPress={()=>{setImagePickerVisible(true)}}>
                <FastImage  style={{width:90,height:90,borderRadius:45,marginTop:20}} source={selectedImage?.uri?{uri:""}: ProfilePhotoDummy}/>
            </Pressable>
            <TextField value={fName} onChangeText={setFName} lable="First Name" icon="user-circle"/>
            <TextField value={lName} onChangeText={setLName} lable="Last Name" icon="user-circle"/>
            <GenderCompoent data={genderData} onPress={(gender)=>{setSelectedGender(gender)}} selected={selectedGender}/>
            <SelectionInput value={selectedCountry?.name} editable={countryPickerVisible} onPress={()=>{setCountryPickerVisible(true)}} lable="Country" icon="globe"/>


            {countryPickerVisible && <CountryPicker onClosePress={()=>{setCountryPickerVisible(!countryPickerVisible)}} onChange={(val,index)=>{onSelectCountry(countryData[index]);setCountryPickerVisible(false)}} data={countryData} selectedCountry={selectedCountry} pickerVisible={countryPickerVisible}/>}

            
            <FillButton title={"Save"} onPress={onSave} style={{backgroundColor:PRIMARY_COLOR,marginTop:90,width:'90%',height:50}}/>
        </ScrollView>
        <ImagePickerModal imagePickerVisible={imagePickerVisible} setImagePickerVisible={setImagePickerVisible}/>
        {loading && <Loading/>}
        
    </KeyboardAvoidingViewCustom>)
}

export default ProfileScreen;