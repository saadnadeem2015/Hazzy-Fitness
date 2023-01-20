import { unwrapResult } from "@reduxjs/toolkit";
import React,{useEffect, useState} from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import FastImage from "react-native-fast-image";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { BLACK_COLOR, LIGHT_TEXT_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "../../../assets/colors";
import { globalStyles } from "../../../assets/fonts";
import KeyboardAvoidingViewCustom from "../../../components/KeyboardAvoidingViewCustom";
import SearchComponent from "../../../components/SearchComponent";
import { getMeal, getMealCategoy, getMealFilter, getWorkout, getWorkoutCategory } from "../../../slices/mealSlice";


const WorkoutLibrary = ({navigation}) =>{

    const dispatch = useDispatch();
    const [searchVal,setSeachVal] = useState('');
    const [filters,setFilters] = useState([]);
    const [categories,setCategories] = useState([]);
    const [meals,setMeals] = useState([]);

    const [selectedFilter,setSelectedFilter] = useState({});
    const [count,setCount] = useState(10);
    const [selectedCategory,setSelectedCategory] = useState({});
    const [enable,setEnable] = useState(true);
    useEffect(()=>{
        navigation.setOptions({
            title: "Workout Library",
            headerRight: () => (
                <Icon onPress={()=>{navigation.navigate("Notifications")}} style={{marginRight:5}} size={15} type='font-awesome' name="bell" color={"#000000AA"}/>
            ),
          });
          getFilter();
          
    },[]);

    const getFilter= async()=>{
        try {
            let res2 = await unwrapResult(await dispatch(getWorkoutCategory()));
            setCategories(res2);
            await getWorkoutsc();
        } catch (error) {
            
        }
    }


    const getWorkoutsc= async(data)=>{
        try {
            let res = await unwrapResult(await dispatch(getWorkout({...data,count:count})));
            setMeals(res?.results)
        } catch (error) {
            
        }
    }

    const addCategory = (item) =>{
        setSelectedCategory(item);
        let data = {
            category_id:item?.id,
            q:searchVal
        }
        getWorkoutsc(data)
    }

    const onSearchByKeyWord = (query)=>{
        setSeachVal(query);
        let data = {
            category_id:selectedCategory?.id?selectedCategory?.id:"",
            q:searchVal
        }
        getWorkoutsc(data)
    }

    const headerComponent = () => {
        return(
            <View style={{backgroundColor:BLACK_COLOR,paddingBottom:5}}>
                <SearchComponent  enable={enable} setEnable={setEnable} value={searchVal} onChangeText={setSeachVal} onSelect={setSelectedFilter} selected={selectedFilter} filters={filters} onSearch={onSearchByKeyWord}/>
                {filters.length>0 && <View style={{width:'85%',backgroundColor:'#333333',height:0.5,marginTop:20,alignSelf:'center'}}/>}
                {enable && <><Text style={[{color:PRIMARY_COLOR,fontSize:16,marginTop:20,width:'100%',alignSelf:'center',paddingHorizontal:15},globalStyles.regular]}>Category</Text>
                <ScrollView horizontal={true} style={{width:'100%',alignSelf:'center',marginTop:15}} contentContainerStyle={{paddingHorizontal:15}}>
                    {
                        categories?.map(item=>{
                            return(
                                <Pressable onPress={()=>{addCategory(item)}} style={[{height:40,borderColor:PRIMARY_COLOR,borderWidth:0.5,marginRight:10,borderRadius:5,justifyContent:'center'},selectedCategory?.id==item?.id && {backgroundColor:PRIMARY_COLOR}]}>
                                    <Text style={[{color:selectedCategory?.id==item?.id ?BLACK_COLOR: PRIMARY_COLOR,paddingVertical:10,paddingHorizontal:15,fontSize:12},globalStyles.regular]}>{item?.name}</Text>
                                </Pressable>
                            )
                        })
                    }
                </ScrollView></>}
            </View>
        )
    }

    const renderItem = ({item}) =>{
        return(
            <View style={{width:'90%',paddingVertical:20,borderColor:LIGHT_TEXT_COLOR,borderBottomWidth:0.5,alignSelf:'center'}}>
                <Pressable onPress={()=>{navigation.navigate("WorkoutVideoPlayer",{workouts:[item]})}} style={{width:'100%',height:180,borderRadius:10}}>
                    <FastImage resizeMode="cover" style={{width:'100%',height:"100%",borderRadius:10}} source={{uri:item?.poster,priority: FastImage.priority.high}}/>
                    <Text style={[{color:PRIMARY_COLOR,fontSize:18,marginTop:10,position:'absolute',top:5,left:5},globalStyles.semiBold]}>{item?.title}</Text>
                </Pressable>
                
                
                {/* <View style={{flexDirection:'row',marginVertical:15}}>
                    <View style={{alignItems:'center',flex:1}}>
                        <Text style={[{color:WHITE_COLOR,fontSize:20},globalStyles.regular]}>{item?.calories}</Text>
                        <Text style={[{color:WHITE_COLOR,fontSize:10},globalStyles.regular]}>Cal</Text>
                    </View>
                    <View style={{flexDirection:'row',flex:4,justifyContent:'space-around'}}>
                        <View style={{alignItems:'center'}}>
                            <Text style={[{color:WHITE_COLOR,fontSize:10},globalStyles.regular]}>Proteins</Text>
                            <Text style={[{color:WHITE_COLOR,fontSize:16},globalStyles.regular]}>{item?.protein}g</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Text style={[{color:WHITE_COLOR,fontSize:10},globalStyles.regular]}>Carbs</Text>
                            <Text style={[{color:WHITE_COLOR,fontSize:16},globalStyles.regular]}>{item?.carbohydrates}g</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Text style={[{color:WHITE_COLOR,fontSize:10},globalStyles.regular]}>Fat</Text>
                            <Text style={[{color:WHITE_COLOR,fontSize:16},globalStyles.regular]}>{item?.fats}g</Text>
                        </View>
                    </View>
                </View> */}
            </View>
        )
    }

    return(
        <KeyboardAvoidingViewCustom style={{flex:1,backgroundColor:'#000',paddingTop:10,alignItems:'center'}}>
            <FlatList
            style={{width:'100%'}}
            contentContainerStyle={{}}
            data={meals}
            renderItem={renderItem}
            extraData={meals}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={headerComponent}
            ListEmptyComponent={()=><Text style={[{color:WHITE_COLOR,alignSelf:'center',marginTop:15},globalStyles.regular]}>No meal found</Text>}/>
        </KeyboardAvoidingViewCustom>
    )
}

export default WorkoutLibrary;