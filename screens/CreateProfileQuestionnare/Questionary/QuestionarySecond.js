import { useHeaderHeight } from "@react-navigation/stack";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { ScrollView,View,Image, Alert, TouchableOpacity, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { PRIMARY_COLOR } from "../../../assets/colors";
import { globalStyles } from "../../../assets/fonts";
import { Logo1X } from "../../../assets/images";
import { updateQuestionaries } from "../../../assets/services/api";
import Donut from "../../../components/DonutChart";
import FillButton from "../../../components/FillButton";
import KeyboardAvoidingViewCustom from "../../../components/KeyboardAvoidingViewCustom";
import Loading from "../../../components/Loading";
import SelectionList from "../../../components/SelectionList";
import { getActivityLevel, getQuestionGoal, getTrainingFor, getWorkoutAvailability, updateMacros, updateQuestionary } from "../../../slices/authSlice";
import { setTrainingProgram } from "../../../slices/mealSlice";

const QuestionarySecond = React.memo(({navigation,route})=>{
    const {question} = route?.params;
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const user = useSelector(state=>state?.auth?.me);
    const [activityLevels,setActivityLevels]= useState([]);

    const [workoutAvailability,setWorkoutAvailability] = useState([]);
    const [workoutFrom,setWorkoutFrom] = useState([]);

    const [goalData,setGoalData] = useState([]);

    const [selectedActivityLevel,setSelectedActivityLevel] = useState(question?.activity_level?question?.activity_level:{});
    const [selectedWorkoutAvailability,setSelectedWorkoutAvailability] = useState(question?.workout_availability?question?.workout_availability:{});
    const [selectedWorkoutFrom,setSelectedWorkoutFrom]=useState(question?.training_for?question?.training_for:{});
    const [selectedGoal,setSelectedGoal] = useState(question?.goal ? question?.goal:{});

    useEffect(()=>{
        getData();
    },[]);

    const getData = async() =>{
        try {
            setLoading(true);
            let activity = await unwrapResult(await dispatch(getActivityLevel()));
            let workout = await unwrapResult(await dispatch(getWorkoutAvailability()));
            let goal = await unwrapResult(await dispatch(getQuestionGoal()));
            let trainingFor = await unwrapResult(await dispatch(getTrainingFor()));
            setLoading(false)
            setActivityLevels(activity);
            setWorkoutAvailability(workout);
            setWorkoutFrom(trainingFor)
            setGoalData(goal);
        } catch (error) {
            setLoading(false)
        }
    }


    const onActivityLevelSelect = (item,index)=>{
    
        setSelectedActivityLevel(item);
    }

    

    const calculate = async() => {
        if(selectedActivityLevel?.id && selectedWorkoutAvailability?.id  && selectedGoal?.id && selectedWorkoutFrom?.id){
            try {
                setLoading(true);
                let data = {
                    ...route.params,
                    "activity_level_id": selectedActivityLevel?.id,
                    "workout_availability_id": selectedWorkoutAvailability?.id,
                    "goal_id": selectedGoal?.id,
                    "training_for_id":selectedWorkoutFrom?.id
                }
                let res = await unwrapResult(await dispatch(updateQuestionary({id:user?.id,data:data})));
                let macros = await unwrapResult(await dispatch(updateMacros()));
                let res2 = await unwrapResult(await dispatch(setTrainingProgram()));
                setLoading(false);
                navigation.navigate("CreateMeal");
            } catch (error) {
                setLoading(false);
                Alert.alert("Error!!",error?.message);
            }
        } else {
            Alert.alert("Alert!!","Please select valid answers first.");
        }
        
    }

    return(
        <KeyboardAvoidingViewCustom style={{flex:1,backgroundColor:'#000'}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:useHeaderHeight()}} style={{flex:1,width:'90%',alignSelf:'center'}}>
                <View style={{alignSelf:'center',width:"20%",marginVertical:28}}>
                    <Image style={{alignSelf:'center'}}  source={Logo1X}/>
                </View>
                <SelectionList selected={selectedActivityLevel} onSelect={onActivityLevelSelect} data={activityLevels} label="Activity level"/>
                <SelectionList desc="How many time per week would you to workout during the program?" selected={selectedWorkoutAvailability} onSelect={setSelectedWorkoutAvailability} data={workoutAvailability} label="Workout availability  "/>
                <SelectionList selected={selectedWorkoutFrom} onSelect={setSelectedWorkoutFrom} data={workoutFrom} label="How long have you been training for?"/>
                <SelectionList type="button" selected={selectedGoal} onSelect={setSelectedGoal} data={goalData} label="Goal"/>
                
                <View style={{flexDirection:'row',alignSelf:'center',marginTop:30}}>
                    <View style={{backgroundColor:PRIMARY_COLOR+"AA",width:6,height:6,borderRadius:3,margin:1}}/>
                    <View style={{backgroundColor:PRIMARY_COLOR,width:6,height:6,borderRadius:3,margin:1}}/>
                </View>
                <FillButton title={"Calculate"} onPress={calculate} style={{backgroundColor:PRIMARY_COLOR,marginTop:10,width:'90%',height:50}}/>
                <TouchableOpacity onPress={()=>{navigation?.navigate("Dashboard",{screen:"DashboardScreen"})}} style={[{height:48,width:'90%',borderColor:PRIMARY_COLOR,borderWidth:1,borderRadius:5,marginTop:15,backgroundColor:"#333333",flexDirection:'row',justifyContent:'center',alignItems:'center',alignSelf:'center'} ]}>
                            <Text style={[{color:PRIMARY_COLOR,fontSize:16,paddingHorizontal:12,alignSelf:'center'},globalStyles.regular]}>Skip</Text>
                </TouchableOpacity>
            </ScrollView>
            {loading && <Loading/>}
        </KeyboardAvoidingViewCustom>
    )
})

export default QuestionarySecond;