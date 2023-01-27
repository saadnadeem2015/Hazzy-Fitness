import React, { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { ScrollView } from "react-native-gesture-handler";
import { BLACK_COLOR, LIGHT_TEXT_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "../../../../assets/colors";
import { globalStyles } from "../../../../assets/fonts";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProfilePhotoDummy } from "../../../../assets/images";
import KeyboardAvoidingViewCustom from "../../../../components/KeyboardAvoidingViewCustom";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { getMealById } from "../../../../slices/mealSlice";
import Loading from "../../../../components/Loading";
import MealVideoModal from "../../../../components/MealVideoModal";
import { Icon } from "react-native-elements";
const ViewMealPage = ({route}) =>{
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const {id} = route?.params;
    const [mealData,setMealData] = useState({});
    const [loading,setLoading] = useState(false);
    const [ismealVideoOpen,setMealVideoOpen] = useState(false);
    const [openedStep,setOpenedStep] = useState({});
    useFocusEffect(useCallback(()=>{
        getMealData();
    },[]));
    useEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
                <Icon onPress={()=>{navigation.navigate("Notifications")}} style={{marginRight:5}} size={15} type='font-awesome' name="bell" color={"#000000AA"}/>
            ),
        });
    },[navigation])
    const getMealData = async()=>{
        try {
            setLoading(true);
            let data = await unwrapResult(await dispatch(getMealById(id)));
            setLoading(false)
            setMealData(data)
        } catch (error) {
            setLoading(false);
        }
    }

    const openStep = (item)=>{
        if(item?.id!=openedStep?.id){
            setOpenedStep(item);
        } else {
            setOpenedStep({})
        }
    }

    return(
        <KeyboardAvoidingViewCustom style={{flex:1,backgroundColor:BLACK_COLOR,paddingHorizontal:'5%',alignItems:'center'}}>
            {loading?
            <Loading/>:
            <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}}>
                <FastImage resizeMode="cover" style={{width:'100%',backgroundColor:LIGHT_TEXT_COLOR,height:180,borderRadius:10,marginTop:20}} source={{uri:mealData?.picture}}/>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:1,alignItems:'center',marginTop:10}}>
                    <Text style={[{color:PRIMARY_COLOR,fontSize:18},globalStyles.semiBold]}>{mealData?.title}</Text>
                    {mealData?.prep_video && <Pressable onPress={()=>{setMealVideoOpen(!ismealVideoOpen)}} style={{flexDirection:'row',borderColor:WHITE_COLOR,borderWidth:0.5,borderRadius:10,padding:8}}>
                        <Text style={[{color:WHITE_COLOR,fontSize:12},globalStyles.regular]}>Meal Prep video</Text>
                        <Ionicons color={WHITE_COLOR} name="play-circle-outline" size={15}/>
                    </Pressable>}
                </View>
                <View style={{flexDirection:'row',marginTop:15}}>
                    <View style={{alignItems:'center',flex:1}}>
                        <Text style={[{color:WHITE_COLOR,fontSize:20},globalStyles.regular]}>{mealData?.calories}</Text>
                        <Text style={[{color:WHITE_COLOR,fontSize:10},globalStyles.regular]}>Cal</Text>
                    </View>
                    <View style={{flexDirection:'row',flex:4,justifyContent:'space-around'}}>
                        <View style={{alignItems:'center'}}>
                            <Text style={[{color:WHITE_COLOR,fontSize:10},globalStyles.regular]}>Proteins</Text>
                            <Text style={[{color:WHITE_COLOR,fontSize:16},globalStyles.regular]}>{mealData?.protein}g</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Text style={[{color:WHITE_COLOR,fontSize:10},globalStyles.regular]}>Carbs</Text>
                            <Text style={[{color:WHITE_COLOR,fontSize:16},globalStyles.regular]}>{mealData?.carbohydrates}g</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Text style={[{color:WHITE_COLOR,fontSize:10},globalStyles.regular]}>Fat</Text>
                            <Text style={[{color:WHITE_COLOR,fontSize:16},globalStyles.regular]}>{mealData?.fats}g</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row',marginVertical:15,borderBottomWidth:0.3,borderTopWidth:0.3,padding:15,borderColor:WHITE_COLOR,justifyContent:'space-between'}}>
                    <Text style={[{fontSize:14,color:WHITE_COLOR},globalStyles.regular]}>Cook time:
                        <Text style={[{color:PRIMARY_COLOR,fontSize:12},globalStyles.regular]}> {mealData?.cook_time} min</Text>
                    </Text>
                    <Text style={[{fontSize:14,color:WHITE_COLOR},globalStyles.regular]}>Prep time:
                        <Text style={[{color:PRIMARY_COLOR,fontSize:12},globalStyles.regular]}> {mealData?.prep_time} min</Text>
                    </Text>
                </View>
                <View style={{borderBottomWidth:0.3,paddingVertical:15,borderColor:WHITE_COLOR,paddingBottom:30}}>
                    <Text style={[{color:PRIMARY_COLOR,fontSize:16},globalStyles.semiBold]}>Ingredients</Text>
                    {
                        mealData?.ingredients?.map(item=>{
                            return <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,marginTop:15}}>
                                <View style={{width:2,height:2,borderRadius:1,backgroundColor:WHITE_COLOR,marginRight:5}}/>
                                <Text style={[{color:WHITE_COLOR,fontSize:12},globalStyles.regular]}>{item?.name}</Text>
                            </View>
                        })
                    }
                </View>
                    <Text style={[{color:PRIMARY_COLOR,fontSize:16,marginTop:15},globalStyles.semiBold]}>Instructions</Text>
                    {
                        mealData?.instructions?.map((item,index)=>{
                            return <Pressable onPress={()=>{openStep(item)}} style={{borderBottomWidth:0.3,padding:15,borderColor:WHITE_COLOR}}>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10}}>
                                    <Text style={[{color:WHITE_COLOR,fontSize:14},globalStyles.regular]}>Step {index+1}</Text>
                                    <Ionicons color={WHITE_COLOR} name={openedStep?.id==item?.id?"chevron-down-outline":"chevron-forward"} size={15}/>
                                </View>
                            {openedStep?.id==item?.id && <Text style={[{color:WHITE_COLOR,fontSize:12,paddingHorizontal:5},globalStyles.regular]}>{item?.name}</Text>}
                            </Pressable>
                        })
                    }
                <View>

                </View>
            </ScrollView>}
            <MealVideoModal video={mealData?.prep_video} instructions={mealData?.instructions} modalVisible={ismealVideoOpen} setModalVisible={(status)=>setMealVideoOpen(status)}/>
        </KeyboardAvoidingViewCustom>
    );
}

export default ViewMealPage;