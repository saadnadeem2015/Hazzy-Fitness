import { unwrapResult } from "@reduxjs/toolkit";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Platform, Pressable, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import  Ionicons  from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import OpenFile from 'react-native-doc-viewer-new'
import { BLACK_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "../../../../assets/colors";
import { globalStyles } from "../../../../assets/fonts";
import KeyboardAvoidingViewCustom from "../../../../components/KeyboardAvoidingViewCustom";
import { getTrainingPlan } from "../../../../slices/mealSlice";
import WorkoutModal from "../../../../components/WorkoutModal";
import Loading from "../../../../components/Loading";
import { useFocusEffect } from "@react-navigation/native";

const TrainingLibrary = ({navigation}) => {
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const [trainingPlans,setTrainingPlans] = useState([]);
    const [docUrl,setDocUrl] = useState('');
    const [todaysWorkout,setTodaysWorkout] = useState({});
    const [workoutModal,showWorkoutModal] = useState(false);
    useEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
                <Icon onPress={()=>{navigation.navigate("Notifications")}} style={{marginRight:5}} size={15} type='font-awesome' name="bell" color={"#000000AA"}/>
            ),
        });
        
    },[navigation]);

    useFocusEffect(useCallback(()=>{
        getPlans();
    },[]));
    


    const getPlans = async () => {
        try {
            setLoading(true);
            let res = await unwrapResult(await dispatch(getTrainingPlan()));
            setLoading(false);
            setDocUrl(res?.pdf_document);
            setTrainingPlans(res?.weeks?.reduce((r, e, i) => (i % 3 ? r[r.length - 1].push(e) : r.push([e])) && r, []));
        } catch (error) {
            setLoading(false);
            console.log("ERROR==>",error);
        }
    }

    const RenderItems = ({item,index})=>{
        const [open,setOpen] = useState(false);
        return <View style={{flex:1}}>
            <Pressable onPress={()=>{setOpen(!open)}} style={{flexDirection:'row',justifyContent:"space-between",borderBottomColor:PRIMARY_COLOR,borderBottomWidth:0.5,paddingHorizontal:10,paddingVertical:5,marginHorizontal:10,marginTop:20}}>
                <Text style={[{color:PRIMARY_COLOR,fontSize:18},globalStyles.regular]}>Week {index+1}-{index+3}</Text>
                <Icon onPress={()=>{}} iconStyle={{fontSize:20}} type='font-awesome' name={open?"angle-up":"angle-down"} color={PRIMARY_COLOR}/>
            </Pressable>
            {open && 
                item?.map((ele,index)=>{
                    return <WeekDays doc={docUrl} index={index} ele={ele}/>
                })
            }
        </View>
    }

    const openDoc = (url) => {
        console.log(url)
        if(Platform.OS === 'ios'){
          OpenFile.openDoc([{
            url:url?url.split('?')[0]:"",
          }], (error, url) => {
           })
        }else{
          //Android
          OpenFile.openDoc([{
            url:url?url.split('?')[0]:"",
            fileName:"sample",
            cache:false,
          }], (error, url) => {
           })
        }
    
      }

    const WeekDays = ({ele,index,doc})=>{
        const [open,setOpen] = useState(false);
        return <>
            <Pressable onPress={()=>{setOpen(!open)}} style={{flexDirection:'row',justifyContent:'space-between',alignContent:'center',paddingVertical:10}}>
                <View style={{flexDirection:'row',paddingHorizontal:5,paddingVertical:10,marginHorizontal:10}}>
                    <Text style={[{color:PRIMARY_COLOR,fontSize:18},globalStyles.regular]}>Week {ele?.week_number}</Text>
                    <Icon iconStyle={{fontSize:20}} type='font-awesome' name={open?"angle-up":"angle-down"} color={PRIMARY_COLOR}/>
                </View>
                {index==0 &&<Text onPress={()=>{openDoc(doc)}} style={[{color:PRIMARY_COLOR,borderColor:PRIMARY_COLOR,alignSelf:'center',borderWidth:0.5,borderRadius:10,paddingHorizontal:20,paddingVertical:10,fontSize:12},globalStyles.regular]}>View pdf</Text>}
            </Pressable>
            {open && <View style={{width:'100%',flexDirection:'row',paddingHorizontal:10}}>
                {/* Monday */}
                {ele?.monday_workout?<Pressable onPress={()=>{setTodaysWorkout(ele?.monday_workout);showWorkoutModal(true)}}  style={[{backgroundColor:ele?.monday_workout?.workout_status?PRIMARY_COLOR:BLACK_COLOR,borderRadius:5,flex:1,height:80,marginLeft:5,alignItems:'center',justifyContent:"center",paddingVertical:10,borderColor:ele?.monday_workout?.workout_status?PRIMARY_COLOR:WHITE_COLOR,borderWidth:1},]}>
                    <Text style={[{color:ele?.monday_workout?.workout_status?BLACK_COLOR:WHITE_COLOR,fontSize:16},globalStyles.regular]}>Mon</Text>
                    {ele?.monday_workout?.workout_status && <Ionicons size={20} type='ionicons' name={"checkmark-circle-outline"} color={BLACK_COLOR}/>}
                </Pressable>:
                <View style={[{backgroundColor:BLACK_COLOR,borderRadius:5,flex:1,height:80,marginLeft:5,alignItems:'center',justifyContent:"center",paddingVertical:10},]}>
                    <Text style={[{color:WHITE_COLOR,fontSize:16},globalStyles.regular]}>Mon</Text>
                    <View
                        style={{
                            position: 'absolute',
                            transform: [ {rotate: '45deg'} ],
                            top: 7,
                            width: '100%',
                            height: 1,
                            borderBottomColor: WHITE_COLOR,
                            borderBottomWidth: 1,
                        }}/>
                </View>
                }
                
                {/* Tuesday */}
                {ele?.tuesday_workout?<Pressable onPress={()=>{setTodaysWorkout(ele?.tuesday_workout);showWorkoutModal(true)}}  style={[{backgroundColor:ele?.tuesday_workout?.workout_status?PRIMARY_COLOR:BLACK_COLOR,borderRadius:5,flex:1,height:80,marginLeft:5,alignItems:'center',justifyContent:"center",paddingVertical:10,borderColor:ele?.tuesday_workout?.workout_status?PRIMARY_COLOR:WHITE_COLOR,borderWidth:1},]}>
                    <Text style={[{color:ele?.tuesday_workout?.workout_status?BLACK_COLOR:WHITE_COLOR,fontSize:16},globalStyles.regular]}>Tue</Text>
                    {ele?.tuesday_workout?.workout_status && <Ionicons size={20} type='ionicons' name={"checkmark-circle-outline"} color={BLACK_COLOR}/>}
                </Pressable>:
                <View style={[{backgroundColor:BLACK_COLOR,borderRadius:5,flex:1,height:80,marginLeft:5,alignItems:'center',justifyContent:"center",paddingVertical:10},]}>
                    <Text style={[{color:WHITE_COLOR,fontSize:16},globalStyles.regular]}>Tue</Text>
                    <View
                        style={{
                            position: 'absolute',
                            transform: [ {rotate: '45deg'} ],
                            top: 7,
                            width: '100%',
                            height: 1,
                            borderBottomColor: WHITE_COLOR,
                            borderBottomWidth: 1,
                        }}/>
                </View>
                }

                {/* Wednesday */}
                {ele?.wednesday_workout?<Pressable onPress={()=>{setTodaysWorkout(ele?.wednesday_workout);showWorkoutModal(true)}} style={[{backgroundColor:ele?.wednesday_workout?.workout_status?PRIMARY_COLOR:BLACK_COLOR,borderRadius:5,flex:1,height:80,marginLeft:5,alignItems:'center',justifyContent:"center",paddingVertical:10,borderColor:ele?.wednesday_workout?.workout_status?PRIMARY_COLOR:WHITE_COLOR,borderWidth:1},]}>
                    <Text style={[{color:ele?.wednesday_workout?.workout_status?BLACK_COLOR:WHITE_COLOR,fontSize:16},globalStyles.regular]}>Wed</Text>
                    {ele?.wednesday_workout?.workout_status && <Ionicons size={20} type='ionicons' name={"checkmark-circle-outline"} color={BLACK_COLOR}/>}
                </Pressable>:
                <View style={[{backgroundColor:BLACK_COLOR,borderRadius:5,flex:1,height:80,marginLeft:5,alignItems:'center',justifyContent:"center",borderColor:WHITE_COLOR,borderWidth:1},]}>
                    
                    <View
                        style={{
                            position:'absolute',
                            transform: [ {rotate: '135deg'} ],
                            width: '100%',
                            height: 1,
                            borderBottomColor: WHITE_COLOR,
                            borderBottomWidth: 1,
                        }}/>
                    <Text style={[{color:WHITE_COLOR,fontSize:16},globalStyles.regular]}>Wed</Text>
                </View>
                }

                {/* Thursday */}
                {ele?.thursday_workout?<Pressable onPress={()=>{setTodaysWorkout(ele?.thursday_workout);showWorkoutModal(true)}}  style={[{backgroundColor:ele?.thursday_workout?.workout_status?PRIMARY_COLOR:BLACK_COLOR,borderRadius:5,flex:1,height:80,marginLeft:5,alignItems:'center',justifyContent:"center",paddingVertical:10,borderColor:ele?.thursday_workout?.workout_status?PRIMARY_COLOR:WHITE_COLOR,borderWidth:1},]}>
                    <Text style={[{color:ele?.thursday_workout?.workout_status?BLACK_COLOR:WHITE_COLOR,fontSize:16},globalStyles.regular]}>Thu</Text>
                    {ele?.thursday_workout?.workout_status && <Ionicons size={20} type='ionicons' name={"checkmark-circle-outline"} color={BLACK_COLOR}/>}
                </Pressable>:
                <View style={[{backgroundColor:BLACK_COLOR,borderRadius:5,flex:1,height:80,marginLeft:5,alignItems:'center',justifyContent:"center",borderColor:WHITE_COLOR,borderWidth:1},]}>
                    
                    <View
                        style={{
                            position:'absolute',
                            transform: [ {rotate: '135deg'} ],
                            width: '100%',
                            height: 1,
                            borderBottomColor: WHITE_COLOR,
                            borderBottomWidth: 1,
                        }}/>
                    <Text style={[{color:WHITE_COLOR,fontSize:16},globalStyles.regular]}>Thu</Text>
                </View>
                }

                {/* Friday */}
                {ele?.friday_workout?<Pressable onPress={()=>{setTodaysWorkout(ele?.friday_workout);showWorkoutModal(true)}} style={[{backgroundColor:ele?.friday_workout?.workout_status?PRIMARY_COLOR:BLACK_COLOR,borderRadius:5,flex:1,height:80,marginLeft:5,alignItems:'center',justifyContent:"center",paddingVertical:10,borderColor:ele?.friday_workout?.workout_status?PRIMARY_COLOR:WHITE_COLOR,borderWidth:1},]}>
                    <Text style={[{color:ele?.friday_workout?.workout_status?BLACK_COLOR:WHITE_COLOR,fontSize:16},globalStyles.regular]}>Fri</Text>
                    {ele?.friday_workout?.workout_status && <Ionicons size={20} type='ionicons' name={"checkmark-circle-outline"} color={BLACK_COLOR}/>}
                </Pressable>:
                <View style={[{backgroundColor:BLACK_COLOR,borderRadius:5,flex:1,height:80,marginLeft:5,alignItems:'center',justifyContent:"center",borderColor:WHITE_COLOR,borderWidth:1},]}>
                    
                    <View
                        style={{
                            position:'absolute',
                            transform: [ {rotate: '135deg'} ],
                            width: '100%',
                            height: 1,
                            borderBottomColor: WHITE_COLOR,
                            borderBottomWidth: 1,
                        }}/>
                    <Text style={[{color:WHITE_COLOR,fontSize:16},globalStyles.regular]}>Fri</Text>
                </View>
                }

                {/* Saturday */}
                {ele?.saturday_workout?<Pressable onPress={()=>{setTodaysWorkout(ele?.saturday_workout);showWorkoutModal(true)}} style={[{backgroundColor:ele?.saturday_workout?.workout_status?PRIMARY_COLOR:BLACK_COLOR,borderRadius:5,flex:1,height:80,marginLeft:5,alignItems:'center',justifyContent:"center",paddingVertical:10,borderColor:ele?.saturday_workout?.workout_status?PRIMARY_COLOR:WHITE_COLOR,borderWidth:1},]}>
                    <Text style={[{color:ele?.saturday_workout?.workout_status?BLACK_COLOR:WHITE_COLOR,fontSize:16},globalStyles.regular]}>Sat</Text>
                    {ele?.saturday_workout?.workout_status && <Ionicons size={20} type='ionicons' name={"checkmark-circle-outline"} color={BLACK_COLOR}/>}
                </Pressable>:
                <View style={[{backgroundColor:BLACK_COLOR,borderRadius:5,flex:1,height:80,marginLeft:5,alignItems:'center',justifyContent:"center",borderColor:WHITE_COLOR,borderWidth:1},]}>
                    
                    <View
                        style={{
                            position:'absolute',
                            transform: [ {rotate: '135deg'} ],
                            width: '100%',
                            height: 1,
                            borderBottomColor: WHITE_COLOR,
                            borderBottomWidth: 1,
                        }}/>
                    <Text style={[{color:WHITE_COLOR,fontSize:16},globalStyles.regular]}>Sat</Text>
                </View>
                }

                {/* Sunday */}
                {ele?.sunday_workout?<Pressable onPress={()=>{setTodaysWorkout(ele?.sunday_workout);showWorkoutModal(true)}} style={[{backgroundColor:ele?.sunday_workout?.workout_status?PRIMARY_COLOR:BLACK_COLOR,borderRadius:5,flex:1,height:80,marginLeft:5,alignItems:'center',justifyContent:"center",paddingVertical:10,borderColor:ele?.sunday_workout?.workout_status?PRIMARY_COLOR:WHITE_COLOR,borderWidth:1},]}>
                    <Text style={[{color:ele?.sunday_workout?.workout_status?BLACK_COLOR:WHITE_COLOR,fontSize:16},globalStyles.regular]}>Sun</Text>
                    {ele?.sunday_workout?.workout_status && <Ionicons size={20} type='ionicons' name={"checkmark-circle-outline"} color={BLACK_COLOR}/>}
                </Pressable>:
                <View style={[{backgroundColor:BLACK_COLOR,borderRadius:5,flex:1,height:80,marginLeft:5,alignItems:'center',justifyContent:"center",borderColor:WHITE_COLOR,borderWidth:1},]}>
                    
                    <View
                        style={{
                            position:'absolute',
                            transform: [ {rotate: '135deg'} ],
                            width: '100%',
                            height: 1,
                            borderBottomColor: WHITE_COLOR,
                            borderBottomWidth: 1,
                        }}/>
                    <Text style={[{color:WHITE_COLOR,fontSize:16},globalStyles.regular]}>Sun</Text>
                </View>
                }
            </View>}
        </>
    }

    return(
        <KeyboardAvoidingViewCustom style={{flex:1,backgroundColor:BLACK_COLOR,justifyContent:"flex-start"}}>
            <FlatList
                data={trainingPlans}
                renderItem={({item,index})=><RenderItems index={index} item={item}/>}
            />

            <WorkoutModal workout={todaysWorkout} modalVisible={workoutModal} setModalVisible={showWorkoutModal}/>
            {loading && <Loading/>}
        </KeyboardAvoidingViewCustom>
    )
}

export default TrainingLibrary;