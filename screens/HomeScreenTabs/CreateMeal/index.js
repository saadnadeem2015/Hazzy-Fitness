import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, View,Text, FlatList, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LIGHT_TEXT_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "../../../assets/colors";
import { globalStyles } from "../../../assets/fonts";
import Donut from "../../../components/DonutChart";
import FillButton from "../../../components/FillButton";
import KeyboardAvoidingViewCustom from "../../../components/KeyboardAvoidingViewCustom";
import Loading from "../../../components/Loading";
import SmallMealComponent from "../../../components/SmallMealComponent";
import { authProfile } from "../../../slices/authSlice";
import { addMealPlanMethod, getMeal, setMealPlan, updateCrealMealPage, updateCrealMealRequirement, updateMealIds, updateMealPlanStatus } from "../../../slices/mealSlice";

const CreatMeal = ({})=>{
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {mealPlanStatus,mealIds} = useSelector(state=>state?.meal);
    const [loading,setLoading] = useState(false)
    const [calGoal,setCalGoal] = useState(0);
    const [selectedCalGoal,setSeletedCalGoal] = useState(0);
    const [proGoal,setProGoal] = useState(0);
    const [carbGoal,setCarbGoal] = useState(0);
    const [fatbGoal,setFatGoal] = useState(0);
    const [selectedProGoal,setSelectedProGoal] = useState(0);
    const [selectedCarbGoal,setSelectedCarbGoal] = useState(0);
    const [selectedFatbGoal,setSelectedFatGoal] = useState(0);
    const [selectedMeal,setSelectedMeal] = useState([]);


    const submitMealPlan = async() =>{
        
        try {
            setLoading(true)
          let data = {
            meals_ids:selectedMeal.map(item=>item?.id)
          }
          let res = await unwrapResult(await dispatch(setMealPlan(data)))
          setLoading(false)
          dispatch(updateCrealMealPage(false));
          navigation.navigate("DashboardScreen");
        } catch (error) {
            setLoading(false)
            Alert.alert("Error!!",error?.message ? error?.message : "Somethjing went wrong.")
        }
      }


      useEffect(()=>{
        navigation.setOptions({
            title: "Change a meal plan",
          });
          getGoals()
          
          dispatch(addMealPlanMethod(submitMealPlan));
          if(selectedCalGoal>0){
            dispatch(updateCrealMealPage(true));
          }
          
        return () => {
            dispatch(updateCrealMealPage(false));
        }
    },[]);

    useEffect(()=>{
        if(mealPlanStatus=='loading'){
            setLoading(true);
        } else if(mealPlanStatus == "done"){
            setLoading(false);
            dispatch(updateMealPlanStatus());
            navigation.navigate("DashboardScreen");
        }
    },[mealPlanStatus]);

    const updateMealPlan = async()=>{
        try {
            setLoading(true);
            dispatch(updateMealPlanStatus());
            setLoading(false);
            navigation.navigate("DashboardScreen");
        } catch (error) {
            setLoading(false);
        }
    }


    const getGoals = async() =>{
        try {
            setLoading(true);
            let res = await unwrapResult(await dispatch(authProfile()));
            if(res?.goal_calories){
                setCalGoal(res?.goal_calories)
            }
            res?.goal_carbohydrates && setCarbGoal(res?.goal_carbohydrates);
            res?.goal_fats && setFatGoal(res?.goal_fats);
            res?.goal_protein && setProGoal(res?.goal_protein);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const selectMeal = (item)=>{
        if(!item){
            return;
        }
        /* if(selectedMeal.filter(i=>i?.id==item?.id).length>0){
            Alert.alert("Alert!","Meal is already added.");
            return;
        } */
        let cal = selectedCalGoal+item?.calories;
        setSeletedCalGoal(cal);
        /* if(cal>0){
            dispatch(updateCrealMealPage(true));
        } */
        let pro = selectedProGoal+item?.protein;
        setSelectedProGoal(pro)

        let carb = selectedCarbGoal+item?.carbohydrates;
        setSelectedCarbGoal(carb);

        let fats = selectedFatbGoal+item?.fats;
        setSelectedFatGoal(fats);
        const meal = [item,...selectedMeal];
        setSelectedMeal(meal);
        /* if(cal==calGoal){
            dispatch(updateCrealMealRequirement(true))
        } else {
            dispatch(updateCrealMealRequirement(false))
        }
        dispatch(updateMealIds(meal.map(item=>item?.id))) */
    }

    const removeMeal = (item,index)=>{
        let cal = selectedCalGoal-item?.calories;
        setSeletedCalGoal(cal);
        if(cal>0){
            dispatch(updateCrealMealPage(true));
          }
        let pro = selectedProGoal-item?.protein;
        setSelectedProGoal(pro)

        let carb = selectedCarbGoal-item?.carbohydrates;
        setSelectedCarbGoal(carb);

        let fats = selectedFatbGoal-item?.fats;
        setSelectedFatGoal(fats);
        const meal = selectedMeal.filter(i=>item?.id!=i?.id);
        setSelectedMeal([...meal]);
        if(cal==calGoal){
            dispatch(updateCrealMealRequirement(true))
        } else {
            dispatch(updateCrealMealRequirement(false))
        }
        //dispatch(updateMealIds(meal.map(item=>item?.id)))
    }

    

    return(<KeyboardAvoidingViewCustom style={{flex:1,backgroundColor:'#000'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{backgroundColor:'#333333',marginHorizontal:15,marginTop:15,borderRadius:10}}>
                <View style={{flexDirection:'row',alignItems:'center',borderColor:WHITE_COLOR,borderBottomWidth:0.5,marginHorizontal:10}}>
                    <Donut width={120} height={120} targetAmount={calGoal.toFixed(2)} leftToSpendAmount={calGoal - selectedCalGoal}/>
                    <View style={{flex:1.5,justifyContent:'center',paddingHorizontal:20}}>
                        <Text style={[{color:LIGHT_TEXT_COLOR,fontSize:15},globalStyles.regular]}>{calGoal>selectedCalGoal?"Left":"Above"}</Text>
                        <Text style={[{color:calGoal>selectedCalGoal?PRIMARY_COLOR:'#EA4335',fontSize:22,marginVertical:5},globalStyles.semiBold]}>{(calGoal - selectedCalGoal).toFixed(2)} <Text style={[{color:LIGHT_TEXT_COLOR,fontSize:8},globalStyles.regular]}>Kcal</Text></Text>
                        <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                            <Text style={[{color:WHITE_COLOR,fontSize:8},globalStyles.regular]}>Proteins</Text>
                            <Text style={[{color:WHITE_COLOR,fontSize:8},globalStyles.regular]}>Carbs</Text>
                            <Text style={[{color:WHITE_COLOR,fontSize:8},globalStyles.regular]}>Fat</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginVertical:5}}>
                    <Text style={[{color:WHITE_COLOR,fontSize:14,marginVertical:5,paddingHorizontal:10},globalStyles.regular]}>Progress bars</Text>
                    <View style={{flexDirection:'row',paddingHorizontal:10}}>
                        <View style={{flex:1}}>
                            <Text style={[{color:WHITE_COLOR,fontSize:10,marginVertical:2},globalStyles.regular]}>Protiens</Text>
                            <View style={{height:15,borderColor:WHITE_COLOR,borderRadius:12,borderWidth:1,overflow:'hidden'}}>
                                <View style={{height:13,width:`${(selectedProGoal/proGoal)*100}%`,backgroundColor:'#EA4335',borderRadius:12}}/>
                            </View>
                            <Text style={[{color:WHITE_COLOR,fontSize:10,marginVertical:2,textAlign:'center'},globalStyles.regular]}>{selectedProGoal.toFixed(2)}/{proGoal.toFixed(2)}</Text>
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
                                <View style={{height:13,width:`${(selectedFatbGoal/fatbGoal)*100}%`,backgroundColor:'#34A853',borderRadius:12}}/>
                            </View>
                            <Text style={[{color:WHITE_COLOR,fontSize:10,marginVertical:2,textAlign:'center'},globalStyles.regular]}>{selectedFatbGoal}/{fatbGoal}</Text>
                        </View>
                        
                    </View>
                </View>
            </View>

            <FillButton title={"Search for meal"} onPress={()=>{navigation.navigate("MealLibrary",{callback:selectMeal})}} style={{backgroundColor:PRIMARY_COLOR,marginVertical:40,width:'90%',height:50}}/>
            <View style={{borderBottomColor:LIGHT_TEXT_COLOR,borderBottomWidth:0.5,paddingBottom:8,marginHorizontal:15}}>
                <Text style={[{fontSize:16,color:WHITE_COLOR},globalStyles.regular]}>List of added meals</Text>
            </View>

            <View style={{marginHorizontal:18}}>
                <FlatList
                    data={selectedMeal}
                    renderItem={({item,index})=><SmallMealComponent index={index} removeMeal={removeMeal} item={item}/>}
                    ListEmptyComponent={()=><Text style={[{fontSize:10,color:WHITE_COLOR,marginVertical:15},globalStyles.regular]}>No Meals Added</Text>}
                />
            </View>
            {selectedMeal.length>0 && <FillButton title={"Submit"} onPress={submitMealPlan} style={{backgroundColor:PRIMARY_COLOR,marginVertical:40,width:'90%',height:50}}/>}
            
        </ScrollView>
        {loading &&<Loading/>}
    </KeyboardAvoidingViewCustom>)
}

export default CreatMeal;