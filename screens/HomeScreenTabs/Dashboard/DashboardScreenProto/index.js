import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { Alert, FlatList, Pressable, ScrollView,Text,View } from "react-native";
import { Icon } from "react-native-elements";
import FastImage from "react-native-fast-image";
import { useDispatch } from "react-redux";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../../../assets/colors";
import { globalStyles } from "../../../../assets/fonts";
import { Logo1X } from "../../../../assets/images";
import KeyboardAvoidingViewCustom from "../../../../components/KeyboardAvoidingViewCustom";
import Loading from "../../../../components/Loading";
import WorkoutModal from "../../../../components/WorkoutModal";
import { setTrainingProgram } from "../../../../slices/mealSlice";


const DashboardScreenProto = ({navigation})=>{
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const [workoutModal,showWorkoutModal] = useState(false);
    const [tabs,setTabs] = useState([{name:"Breakfast",isSelected:true},{name:"Lunch",isSelected:false},{name:"Dinner",isSelected:false},{name:"Snack",isSelected:false}]);

    const selectNewTab = (selected,index)=>{
        
        let updatedTabs = tabs.map(item=>{
            if(item.name==selected.name){
                item.isSelected = true;
            } else{
                item.isSelected = false;
            }
            return item;
        })
        setTabs([...updatedTabs])
    }
    /* const getQuestionary = async() =>{
        try {
            let res = await unwrapResult(await dispatch())
        } catch (error) {
            
        }
    } */

    const generateWorkout = async ()=>{
        navigation.navigate("QuestionaryFirst");
    }

    const renderInitialItems=()=>{
        return(
            <Pressable style={{height:90,justifyContent:'center',width:'100%',marginVertical:10,backgroundColor:'#333333',borderStyle:'dashed',borderRadius:10,borderWidth:1,borderColor:PRIMARY_COLOR}}>
                <Text style={{alignSelf:'center'}}>None</Text>
            </Pressable>
        )
    }
    const listHeader = () =>{

        return(
            <View style={{flex:1}}>
                <FastImage style={{height:62,width:62,marginTop:15,borderRadius:31,alignSelf:'center'}} source={Logo1X}/>
                <Text style={[{color:WHITE_COLOR,alignSelf:'center',fontSize:14,marginTop:9},globalStyles.regular]}>Name</Text>
                <Text style={[{color:WHITE_COLOR,fontSize:14,marginTop:9,marginVertical:5},globalStyles.regular]}>Today's workout</Text>
                <Pressable onPress={generateWorkout} style={{flexDirection:"row",backgroundColor:'#333333',height:70,width:'100%',borderRadius:8,alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={{color:PRIMARY_COLOR,paddingHorizontal:15}}>Generate Training Plan</Text>
                    <View style={{backgroundColor:PRIMARY_COLOR,height:70,width:'15%',borderRadius:8,justifyContent:'center',alignItems:'center'}}>
                        <Icon onPress={generateWorkout} iconStyle={{fontSize:20}} type='ionicons' name="play-circle-outline" color={"#000"}/>
                        <Text style={[{fontSize:8,textAlign:'center'},globalStyles.regular]}>Start</Text>
                    </View>
                </Pressable>

                <Text style={[{color:WHITE_COLOR,fontSize:14,marginVertical:15},globalStyles.regular]}>Current Meal plan</Text>
                <View style={{flexDirection:'row',justifyContent:'space-around',borderBottomColor:'#333333',borderBottomWidth:0.5}}>
                    {
                        tabs.map((item,index)=>{
                            return <Pressable onPress={()=>{selectNewTab(item,index)}} style={[item?.isSelected &&{borderBottomWidth:1,borderBottomColor:PRIMARY_COLOR},{paddingVertical:10}]}>
                                <Text style={[{fontSize:14,textAlignVertical:'bottom',color:item?.isSelected?PRIMARY_COLOR:WHITE_COLOR},globalStyles.regular]}>
                                    {item?.name}
                                </Text>
                            </Pressable>
                        })
                    }
                </View>
            </View>
        )
    }
    return(
        <KeyboardAvoidingViewCustom style={{flex:1,backgroundColor:'#000'}}>
            <ScrollView contentContainerStyle={{height:'100%'}} nestedScrollEnabled={true} style={{paddingHorizontal:10,flex:1}}>
                
                <FlatList
                ListHeaderComponent={listHeader}
                    style={{flex:1}}
                    data={[1,2,3,4,5,6]}
                    renderItem={renderInitialItems}/>
            </ScrollView>
            <WorkoutModal modalVisible={workoutModal} setModalVisible={showWorkoutModal}/>
            {loading && <Loading/>}
        </KeyboardAvoidingViewCustom>
    );
}

export default DashboardScreenProto;