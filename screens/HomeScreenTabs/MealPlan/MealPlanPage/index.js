import { useFocusEffect } from "@react-navigation/native";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { BLACK_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "../../../../assets/colors";
import { globalStyles } from "../../../../assets/fonts";
import FillButton from "../../../../components/FillButton";
import KeyboardAvoidingViewCustom from "../../../../components/KeyboardAvoidingViewCustom";
import LargeMealListItem from "../../../../components/LargeMealListItem";
import Loading from "../../../../components/Loading";
import { getMealCategoy, getMealPlan } from "../../../../slices/mealSlice";

const MealPlanPage = ({navigation}) =>{
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const [tabs,setTabs] = useState([]);
    const [meals,setMeals] = useState([]);
    const [selectedTab,setSelectedTab] = useState({});
    useFocusEffect(useCallback(()=>{
        navigation.setOptions({
            title: "Meal Plan",
        });
        getCategory();
    },[]));
    useEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
                <Icon onPress={()=>{navigation.navigate("Notifications")}} style={{marginRight:5}} size={15} type='font-awesome' name="bell" color={"#000000AA"}/>
            ),
          });
    },[navigation])

    const getCategory = async()=>{
        try {
            setLoading(true)
            let cat = await unwrapResult(await dispatch(getMealCategoy()));
            setTabs(cat);
            setLoading(false)
            if(cat?.length>0){
                setSelectedTab(cat[0]);
                await getMeal(cat[0]);
            }
            
        } catch (error) {
            setLoading(false);
            Alert.alert("Error!!",error?.message?error?.message:"something went wrong");
        }
    }

    const getMeal = async(tab) =>{
        try {
            setLoading(true)
            let meal = await unwrapResult(await dispatch(getMealPlan()));
            let data = meal?.meals.filter(item=>item?.category?.id==tab?.id);
            setLoading(false);
            setMeals(data);
        } catch (error) {
            setLoading(false);
            Alert.alert("Error!!",error?.message?error?.message:"something went wrong");
        }
    }

    const onTabChange = (item) =>{
        setSelectedTab(item);
        getMeal(item)
    }

    const onItemClick = (item)=>{
        navigation.navigate("View Meal",{id:item?.id});
    }

    return(
        <KeyboardAvoidingViewCustom style={{flex:1,alignItems:'center',backgroundColor:BLACK_COLOR}}>
            <View style={{width:'90%',marginHorizontal:'5%',flexDirection:'row',justifyContent:'space-around',borderBottomColor:'#333333',borderBottomWidth:0.5,marginTop:10}}>
                {
                    tabs.map((item,index)=>{
                        return <Pressable onPress={()=>{onTabChange(item)}} style={[item?.id==selectedTab?.id &&{borderBottomWidth:1,borderBottomColor:PRIMARY_COLOR},{paddingVertical:10}]}>
                            <Text style={[{fontSize:14,textAlignVertical:'bottom',color:item?.id==selectedTab?.id?PRIMARY_COLOR:WHITE_COLOR},globalStyles.regular]}>
                                {item?.name}
                            </Text>
                        </Pressable>
                    })
                }
            </View>
            <FlatList
            style={{width:'100%',}}
                data={meals}
                renderItem={({item})=><LargeMealListItem callback={onItemClick} item={item}/>}
                ListEmptyComponent={()=><Text style={[{color:WHITE_COLOR,alignSelf:'center',marginTop:15},globalStyles.regular]}>No meal found</Text>}/>
            <FillButton title={"Change Meal Plan"} onPress={()=>{navigation.navigate("Dashboard",{screen:"CreateMeal"})}} style={{backgroundColor:PRIMARY_COLOR,marginVertical:10,width:'90%',height:50}}/>
            {loading && <Loading/>}
        </KeyboardAvoidingViewCustom>
    )
}

export default MealPlanPage;