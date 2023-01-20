import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { ScrollView,View,Image, Alert, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { PRIMARY_COLOR } from "../../../assets/colors";
import { Logo1X } from "../../../assets/images";
import SelectionInput from "../../../components/Picker/selectionInput";
import FillButton from "../../../components/FillButton";
import KeyboardAvoidingViewCustom from "../../../components/KeyboardAvoidingViewCustom";
import Loading from "../../../components/Loading";
import { getHeightUnit, getLifeStyle, getQuestionary, getWeightUnit } from "../../../slices/authSlice";
import WeightPicker from "../../../components/Picker/weightPicker";
import HightPicker from "../../../components/Picker/heightPicker";
import ImagePicker from "../../../components/Picker/datePicker";
import moment from 'moment';
import { mapErrorMessage } from "@modules/login/auth/utils";
import SelectionListPicker from "../../../components/Picker/SelectionListPicker";
import { globalStyles } from "../../../assets/fonts";
import { TouchableOpacity } from "react-native";

const QuestionaryFirst = React.memo(({navigation})=>{
    const dispatch = useDispatch();
    const user = useSelector(state=>state?.auth?.me);
    const [loading,setLoading] = useState(false);
    const [lifestyleOpen,setLifestyleOpen] = useState(false);
    const [weightOpen,setWeightOpen] = useState(false);
    const [hightOpen,setHightOpen] = useState(false);
    const [dobOpen,setDobOpen] = useState(false);
    const [lifeStyles,setLifeStyles] = useState([]);
    const [heightUnits,setHeightUnits] = useState([]);
    const [weightUnits,setWeightUnits] = useState([]);
    const [weightValue,setWeightValue] = useState("");
    const [hightValue,setHightValue] = useState("");
    const [dob,setDob] = useState(new Date());
    const [selectedLifeStyle,setSelectedLifestyle] = useState({});
    const [selectedWeightUnit,setSelectedWeightUnit] = useState({});
    const [selectedHightUnit,setSelectedHightUnit] = useState({});

    const [question,setQuestions] = useState({});

    useEffect(()=>{
        getData();
    },[]);

    const getData = async () =>{
        try {
            setLoading(true);
            let question = await unwrapResult(await dispatch(getQuestionary(user?.id)));
            setQuestions(question);
            setDob(question?.birth_date? question?.birth_date :new Date());
            setSelectedLifestyle(question?.life_style);
            setSelectedHightUnit(question?.weight_unit?question?.weight_unit+"":"");
            setHightValue(question?.height);
            setSelectedWeightUnit(question?.weight_unit);
            setWeightValue(question?.weight?question?.weight+"":"");
            let lifestyle = await unwrapResult(await dispatch(getLifeStyle()));
            let heightUnit = await unwrapResult(await dispatch(getHeightUnit()));
            let weightUnit = await unwrapResult(await dispatch(getWeightUnit()));
            setLifeStyles(lifestyle);
            setHeightUnits(heightUnit);
            setWeightUnits(weightUnit);

            if(weightUnit?.length>0){
                setSelectedWeightUnit(weightUnit[0])
            }

            if(heightUnit?.length>0){
                setSelectedHightUnit(heightUnit[0])
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            Alert.alert("Error!!",mapErrorMessage(error)?.message)
        }
    }

    const goToNext = () =>{
        if(selectedLifeStyle?.id && weightValue && selectedWeightUnit?.id && hightValue){
            let data = {
                "birth_date": "1990-01-01",
                "life_style_id": selectedLifeStyle?.id,
                "weight": weightValue,
                "weight_unit_id": selectedWeightUnit?.id,
                "height": hightValue,
                "height_unit_id": selectedHightUnit?.id,
                question:question
            }
            navigation.navigate("Questionary",data);
        } else {
            Alert.alert("Alert!!","Please select valid answers first.");
        }
        
    }

    return(
        <KeyboardAvoidingViewCustom style={{flex:1,backgroundColor:'#000'}}>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,width:'100%',alignSelf:'center'}}>
                <View style={{alignSelf:'center',width:"20%",marginVertical:28}}>
                    <Image style={{alignSelf:'center'}}  source={Logo1X}/>
                </View>
                <SelectionInput value={moment(dob).format("ll")} onPress={()=>{setDobOpen(!dobOpen)}} lable="Birthday" icon="angle-right"/>
                {
                   dobOpen && <ImagePicker visible={dobOpen} date={dob} setDate={setDob} onClosePress={()=>{setDobOpen(!dobOpen)}}/>
                }
                <SelectionInput value={selectedLifeStyle?.name} onPress={()=>{setLifestyleOpen(!lifestyleOpen)}} lable="Lifestyle" icon={lifestyleOpen?"angle-up":"angle-down"}/>
                {
                   lifestyleOpen && <SelectionListPicker lable={"Lifestyle"} value={lifestyleOpen} onClosePress={()=>{setLifestyleOpen(!lifestyleOpen)}} data={lifeStyles} selectedValue={selectedLifeStyle} selectValue={(item)=>{setSelectedLifestyle(item);}}/>
                }
                <SelectionInput value={weightValue} onPress={()=>{setWeightOpen(!weightOpen)}} lable="Weight" icon="angle-down"/>
                {
                    weightOpen && <WeightPicker visible={weightOpen} onClosePress={()=>{setWeightOpen(!weightOpen)}} onValueChange={setWeightValue} measuresData={weightUnits} selectedWeightUnit={selectedWeightUnit} onSelectWeightUnit={(val,index)=>{setSelectedWeightUnit(weightUnits[index])}}/>
                }
                <SelectionInput value={hightValue} onPress={()=>{setHightOpen(!hightOpen)}} lable="Hight" icon="angle-right"/>
                {
                    hightOpen && <HightPicker visible={hightOpen} onClosePress={()=>{setHightOpen(!hightOpen)}} onValueChange={setHightValue} measuresData={heightUnits} selectedWeightUnit={selectedHightUnit} onSelectWeightUnit={(val,index)=>{setSelectedHightUnit(heightUnits[index])}}/>
                }
                <View style={{flexDirection:'row',alignSelf:'center',marginTop:60}}>
                    <View style={{backgroundColor:PRIMARY_COLOR,width:6,height:6,borderRadius:3,margin:1}}/>
                    <View style={{backgroundColor:PRIMARY_COLOR+"AA",width:6,height:6,borderRadius:3,margin:1}}/>
                </View>
                <FillButton title={"Next"} onPress={goToNext} style={{backgroundColor:PRIMARY_COLOR,marginTop:10,width:'90%',height:50}}/>
                <TouchableOpacity onPress={()=>{navigation?.navigate("Dashboard",{screen:"DashboardScreen"})}} style={[{height:48,width:'90%',borderColor:PRIMARY_COLOR,borderWidth:1,borderRadius:5,marginTop:15,backgroundColor:"#333333",flexDirection:'row',justifyContent:'center',alignItems:'center',alignSelf:'center'} ]}>
                            <Text style={[{color:PRIMARY_COLOR,fontSize:16,paddingHorizontal:12,alignSelf:'center'},globalStyles.regular]}>Skip</Text>
                </TouchableOpacity>
            </ScrollView>
            {loading && <Loading/>}
        </KeyboardAvoidingViewCustom>
    )
});

export default QuestionaryFirst;