import { unwrapResult } from "@reduxjs/toolkit";
import React,{useEffect, useState} from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Icon } from "react-native-elements";

import { FlatList } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { BLACK_COLOR, LIGHT_TEXT_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "../../../assets/colors";
import { globalStyles } from "../../../assets/fonts";
import KeyboardAvoidingViewCustom from "../../../components/KeyboardAvoidingViewCustom";
import LargeMealListItem from "../../../components/LargeMealListItem";
import SearchComponent from "../../../components/SearchComponent";
import { getMeal, getMealCategoy, getMealFilter } from "../../../slices/mealSlice";


const MealLibrary = ({navigation,route}) =>{
    const {callback} = route?.params;
    const dispatch = useDispatch();
    const [filters,setFilters] = useState([]);
    const [categories,setCategories] = useState([]);
    const [meals,setMeals] = useState([]);
    const [searchVal,setSeachVal] = useState('');
    const [selectedFilter,setSelectedFilter] = useState({});
    const [selectedCategory,setSelectedCategory] = useState({});
    const [enable,setEnable] = useState(true);
    useEffect(()=>{
        navigation.setOptions({
            title: "Meal Library",
            headerRight: () => (
                <Icon onPress={()=>{navigation.navigate("Notifications")}} style={{marginRight:5}} size={15} type='font-awesome' name="bell" color={"#000000AA"}/>
            ),
          });
          getFilter();
          
    },[]);

    const getFilter= async()=>{
        try {
            let res = await unwrapResult(await dispatch(getMealFilter()));
            setFilters(res);
            let res2 = await unwrapResult(await dispatch(getMealCategoy()));
            setCategories(res2);
            await getMealsc({});
        } catch (error) {
            
        }
    }

    const addCategory = (item) =>{
        setSelectedCategory(item);

        let data = {
            category_id:item?.id?item?.id:"",
            q:searchVal,
            filter_id:selectedFilter?.id?selectedFilter?.id:""
        }
        getMealsc(data)
    }


    const getMealsc= async(data)=>{
        try {
            let res = await unwrapResult(await dispatch(getMeal(data)));
            setMeals(res?.results)
        } catch (error) {
            
        }
    }
    const onSearchByKeyWord = (query)=>{
        setSeachVal(query);
        let data = {
            category_id:selectedCategory?.id?selectedCategory?.id:"",
            q:query,
            filter_id:selectedFilter?.id?selectedFilter?.id:""
        }
        getMealsc(data)
    }

    const selectFilter = (item)=>{
        setSelectedFilter(item)
        let data = {
            category_id:selectedCategory?.id?selectedCategory?.id:"",
            q:searchVal,
            filter_id:item?.id?item?.id:""
        }
        getMealsc(data)
    }

    const headerComponent = () => {
        return(
            <View style={{backgroundColor:BLACK_COLOR,paddingBottom:5}}>
                <SearchComponent enable={enable} setEnable={setEnable} value={searchVal} onChangeText={setSeachVal} onSearch={onSearchByKeyWord} onSelect={selectFilter} selected={selectedFilter} filters={filters}/>
                {enable && <>
                    <View style={{width:'85%',backgroundColor:'#333333',height:0.5,marginTop:20,alignSelf:'center'}}/>
                    <Text style={[{color:PRIMARY_COLOR,fontSize:16,marginTop:20,width:'100%',alignSelf:'center',paddingHorizontal:15},globalStyles.regular]}>Categories</Text>
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
                    </ScrollView>
                </>}
            </View>
        )
    }

    const itemClick = (item) =>{
        if(route?.params?.from == 'more'){
            navigation.navigate("View Meal",{id:item?.id});
        } else {
            callback(item);navigation.goBack()
        }
    }
    

    return(
        <KeyboardAvoidingViewCustom style={{flex:1,backgroundColor:'#000',paddingTop:10,alignItems:'center'}}>
            <FlatList
            style={{width:'100%'}}
            contentContainerStyle={{}}
            data={meals}
            renderItem={({item})=><LargeMealListItem callback={itemClick} item={item}/>}
            extraData={meals}
            ListHeaderComponent={headerComponent}
            stickyHeaderIndices={[0]}
            ListEmptyComponent={()=><Text style={[{color:WHITE_COLOR,alignSelf:'center',marginTop:15},globalStyles.regular]}>No meal found</Text>}/>
        </KeyboardAvoidingViewCustom>
    )
}

export default MealLibrary;