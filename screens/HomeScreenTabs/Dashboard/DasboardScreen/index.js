import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, ScrollView,Text,View } from "react-native";
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon  from "react-native-vector-icons/Entypo";
import FastImage from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import { PRIMARY_COLOR, WHITE_COLOR,LIGHT_TEXT_COLOR } from "../../../../assets/colors";
import WorkoutModal from "../../../../components/WorkoutModal";
import { globalStyles } from "../../../../assets/fonts";
import { Logo1X, ProfilePhotoDummy } from "../../../../assets/images";
import KeyboardAvoidingViewCustom from "../../../../components/KeyboardAvoidingViewCustom";
import Donut from "../../../../components/DonutChart";
import { authProfile, getQuestionary, getQuestionGoal, getTodaysWorkout, updateMacros } from "../../../../slices/authSlice";
import { getMeal, getMealCategoy, getMealPlan, setMealComplete } from "../../../../slices/mealSlice";
import MealListComponent from "../../../../assets/services";
import Loading from "../../../../components/Loading";
import { mapErrorMessage } from "@modules/login/auth/utils";


const DashboardScreen = ({navigation})=>{
    const dispatch = useDispatch();
    const user = useSelector(state=>state?.auth?.me);
    const [workoutModal,showWorkoutModal] = useState(false);
    const [tabs,setTabs] = useState([]);
    const [meals,setMeals] = useState([]);
    const [selectedCat, setSelectedCat] = useState({});
    const [loading,setLoading] = useState(false)
    const [calGoal,setCalGoal] = useState(950);
    const [selectedCalGoal,setSeletedCalGoal] = useState(0);
    const [proGoal,setProGoal] = useState(0);
    const [carbGoal,setCarbGoal] = useState(0);
    const [fatbGoal,setFatGoal] = useState(0);
    const [currentWeight,setCurrentWeight] = useState('');
    const [selectedProGoal,setSelectedProGoal] = useState(0);
    const [selectedCarbGoal,setSelectedCarbGoal] = useState(0);
    const [selectedFatbGoal,setSelectedFatGoal] = useState(0);
    const [selectedTab,setSelectedTab] = useState({});
    const [todaysWorkout,setTodaysWorkout] = useState({})

    useEffect(()=>{
        getDetails();
    },[]);

    const getDetails = async()=>{
        try {
            setLoading(true)
            let res = await unwrapResult(await dispatch(authProfile()));
            let workout = await unwrapResult(await dispatch(getTodaysWorkout()));
            let cat = await unwrapResult(await dispatch(getMealCategoy()));
            let question = await unwrapResult(await dispatch(getQuestionary(user?.user_questionnaire)));
            setTodaysWorkout(workout)
            setCurrentWeight(question?.weight)
            if(res?.goal_calories){
                setCalGoal(res?.goal_calories)
            }
            res?.goal_carbohydrates && setCarbGoal(res?.goal_carbohydrates);
            res?.goal_fats && setFatGoal(res?.goal_fats);
            res?.goal_protein && setProGoal(res?.goal_protein);
            setTabs(cat.map((item,index)=>{
                if(index==0){
                    item["isSelected"]=true;
                } else {
                    item["isSelected"]=false;
                }
                return item;
            }));
            await getMealPlans(cat[0]);
            setLoading(false)
            
        } catch (error) {
            setLoading(false)
        }
    }

    const getMealPlans = async(tab)=>{
        try {
            let data = {category:tabs.filter(item=>item.isSelected)[0]?.id}
            let meal = await unwrapResult(await dispatch(getMealPlan(data)))
            let meals = meal?.meals.filter(item=>item?.category?.id==tab?.id);
            setMeals(meals);
        } catch (error) {
            Alert.alert("Error!!",error?.message && error?.message !=""?error?.message:"something went wrong.")
        }
    }

    const recalculate = async()=>{
        try {
            setLoading(true);
            let res = await unwrapResult(await dispatch(updateMacros()));
            setLoading(false);
            if(res?.goal_calories){
                setCalGoal(res?.goal_calories)
            }
            res?.goal_carbohydrates && setCarbGoal(res?.goal_carbohydrates);
            res?.goal_fats && setFatGoal(res?.goal_fats);
            res?.goal_protein && setProGoal(res?.goal_protein);
        } catch (error) {
            setLoading(false);
            Alert.alert("Error!!",mapErrorMessage(error)?.message);
        }
    }

    const selectNewTab = (selected,index)=>{
        setSelectedTab(selected);
        let updatedTabs = tabs.map(item=>{
            if(item.name==selected.name){
                item.isSelected = true;
            } else{
                item.isSelected = false;
            }
            return item;
        })
        setTabs([...updatedTabs])
        getMealPlans(selected)
    }
    
    const listHeader = () =>{

        return(
            <View style={{flex:1}}>
                <FastImage style={{height:62,width:62,marginTop:15,borderRadius:31,alignSelf:'center'}} source={user?.profile_image?{uri:user?.profile_image}:ProfilePhotoDummy}/>
                <Text style={[{color:WHITE_COLOR,alignSelf:'center',fontSize:14,marginTop:9},globalStyles.regular]}>{user?.name}</Text>
                <Text style={[{color:WHITE_COLOR,fontSize:14,marginTop:9,marginVertical:5},globalStyles.regular]}>Today's workout</Text>
                <Pressable onPress={()=>{showWorkoutModal(!workoutModal)}} style={{flexDirection:"row",backgroundColor:'#333333',height:70,width:'100%',borderRadius:8,alignItems:'center',overflow:'hidden'}}>
                    <FastImage resizeMode="cover" style={{width:'15%',height:'80%',margin:8,borderRadius:10}} source={{uri:todaysWorkout?.workout_items?.length>0?todaysWorkout?.workout_items[0]?.exercise?.poster:""}}/>
                    <View style={{flex:1,alignItems:'flex-start',paddingVertical:10,justifyContent:'flex-start',height:'100%'}}>
                        <Text style={{color:PRIMARY_COLOR,fontSize:16,marginBottom:3}}>Week1</Text>
                        <Text style={{color:WHITE_COLOR,fontSize:14}}>{todaysWorkout?.name}</Text>
                    </View>
                    
                    <View style={{backgroundColor:PRIMARY_COLOR,height:70,width:'15%',borderRadius:8,justifyContent:'center',alignItems:'center',alignSelf:'flex-end'}}>
                        <Icon size={25} name="calendar-refresh" color={"#000"}/>
                        <Text style={[{fontSize:8,textAlign:'center'},globalStyles.regular]}>Resume</Text>
                    </View>
                </Pressable>

                <Text style={[{color:WHITE_COLOR,fontSize:14,marginTop:15},globalStyles.regular]}>Current Meal plan</Text>
                <View style={{backgroundColor:'#333333',marginTop:15,borderRadius:10}}>
                <View style={{flexDirection:'row',alignItems:'center',borderColor:WHITE_COLOR,borderBottomWidth:0.5,marginHorizontal:15}}>
                    <Donut width={120} height={120} targetAmount={calGoal==0?1000:calGoal} leftToSpendAmount={(calGoal==0?1000:calGoal) - selectedCalGoal}/>
                    <View style={{flex:1.5,justifyContent:'center',alignItems:'center',paddingHorizontal:20,marginVertical:15}}>
                        <Text style={[{color:WHITE_COLOR,fontSize:10},globalStyles.regular]}>Current Weight</Text>
                        <Text style={[{color:PRIMARY_COLOR,fontSize:48,marginVertical:2},globalStyles.regular]}>{currentWeight}<Text style={[{color:PRIMARY_COLOR,fontSize:14,marginVertical:5},globalStyles.regular]}>kg</Text></Text>
                        <Pressable onPress={recalculate} style={{flexDirection:'row',borderColor:PRIMARY_COLOR,borderWidth:0.5,borderRadius:10,padding:5,justifyContent:'space-between'}}>
                            <Text style={[{color:PRIMARY_COLOR,fontSize:12,marginHorizontal:5},globalStyles.regular]}>Recalculate</Text>
                            <EntypoIcon size={15} name="cycle" color={PRIMARY_COLOR}/>
                        </Pressable>
                    </View>
                </View>
                <View style={{marginVertical:5,marginHorizontal:10}}>
                    <Text style={[{color:WHITE_COLOR,fontSize:14,marginVertical:5,paddingHorizontal:10},globalStyles.regular]}>Progress bars</Text>
                    <View style={{flexDirection:'row',paddingHorizontal:10}}>
                        <View style={{flex:1}}>
                            <Text style={[{color:WHITE_COLOR,fontSize:10,marginVertical:2},globalStyles.regular]}>Protiens</Text>
                            <View style={{height:15,borderColor:WHITE_COLOR,borderRadius:12,borderWidth:1,overflow:'hidden'}}>
                                <View style={{height:13,width:`${(selectedProGoal/proGoal)*100}%`,backgroundColor:'red',borderRadius:12}}/>
                            </View>
                            <Text style={[{color:WHITE_COLOR,fontSize:10,marginVertical:2,textAlign:'center'},globalStyles.regular]}>{selectedProGoal}/{proGoal}</Text>
                        </View>

                        <View style={{flex:1,paddingHorizontal:10}}>
                            <Text style={[{color:WHITE_COLOR,fontSize:10,marginVertical:2},globalStyles.regular]}>Carbs</Text>
                            <View style={{height:15,borderColor:WHITE_COLOR,borderRadius:12,borderWidth:1,overflow:'hidden'}}>
                                <View style={{height:13,width:`${(selectedCarbGoal/carbGoal)*100}%`,backgroundColor:WHITE_COLOR,borderRadius:12}}/>
                            </View>
                            <Text style={[{color:WHITE_COLOR,fontSize:10,marginVertical:2,textAlign:'center'},globalStyles.regular]}>{selectedCarbGoal}/{carbGoal}</Text>
                        </View>

                        <View style={{flex:1,paddingHorizontal:10}}>
                            <Text style={[{color:WHITE_COLOR,fontSize:10,marginVertical:2},globalStyles.regular]}>Fats</Text>
                            <View style={{height:15,borderColor:WHITE_COLOR,borderRadius:12,borderWidth:1,overflow:'hidden'}}>
                                <View style={{height:13,width:`${(selectedFatbGoal/fatbGoal)*100}%`,backgroundColor:'green',borderRadius:12}}/>
                            </View>
                            <Text style={[{color:WHITE_COLOR,fontSize:10,marginVertical:2,textAlign:'center'},globalStyles.regular]}>{selectedFatbGoal}/{fatbGoal}</Text>
                        </View>
                        
                    </View>
                </View>
            </View>
                <View style={{flexDirection:'row',justifyContent:'space-around',borderBottomColor:'#333333',borderBottomWidth:0.5,marginTop:10}}>
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
    const selectFoodItem = item =>{
        navigation.navigate("View Meal",{id:item?.id});
    }
    const markComplete = async(item) =>{
        try {
            setLoading(true);
            let res = await unwrapResult(await dispatch(setMealComplete({"meal_id": item?.id})))
            getMealPlans(selectedTab);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    return(
        <KeyboardAvoidingViewCustom style={{flex:1,backgroundColor:'#000'}}>
            <ScrollView contentContainerStyle={{height:'100%'}} nestedScrollEnabled={true} style={{paddingHorizontal:10,flex:1}}>
                
                <FlatList
                    ListHeaderComponent={listHeader}
                    style={{flex:1}}
                    data={meals}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item,index})=><MealListComponent onSelect={selectFoodItem} item={item} index={index} markComplete={markComplete}/>}
                    ListEmptyComponent={()=><Text style={[{color:WHITE_COLOR,alignSelf:'center',marginTop:15},globalStyles.regular]}>No meal found</Text>}/>
            </ScrollView>
            {loading && <Loading/>}
            <WorkoutModal workout={todaysWorkout} modalVisible={workoutModal} setModalVisible={showWorkoutModal}/>
        </KeyboardAvoidingViewCustom>
    );
}

export default DashboardScreen;