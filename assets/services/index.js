import React from "react";
import { View,Text, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FastImage from "react-native-fast-image";
import { BLACK_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";
import { MEAL } from "../../assets/images";
const MealListComponent = ({item,index,removeMeal,onSelect=()=>{},markComplete=()=>{}})=>{
    return(
        <Pressable onPress={()=>{onSelect(item)}} style={{flexDirection:'row',marginVertical:5,borderRadius:10,height:89,width:'100%',backgroundColor:'#333333'}}>
            <FastImage resizeMode="stretch" style={{height:89,width:89,borderRadius:10}} source={{uri:item?.picture}}/>
            <View style={{padding:10,flex:1}}>
                <Text style={[{flex:1,color:PRIMARY_COLOR,fontSize:16},globalStyles.regular]}>{item?.title}</Text>
                <View style={{alignItems:'flex-end',flex:1}}>
                    <Pressable onPress={()=>{markComplete(item)}} style={[{flexDirection:'row',width:'40%',justifyContent:'space-between',alignItems:'center',borderColor:PRIMARY_COLOR,borderWidth:0.5,borderRadius:10,padding:5},item?.is_completed &&{backgroundColor:PRIMARY_COLOR}]}>
                        <Text style={[{color:item?.is_completed?BLACK_COLOR:PRIMARY_COLOR,fontSize:12},globalStyles.regular]}>Completed</Text>
                        <Icon size={20} type='ionicons' name={item?.is_completed?"checkmark-circle-outline":"radio-button-off"} color={item?.is_completed?BLACK_COLOR:PRIMARY_COLOR}/>
                    </Pressable>
                    
                </View>
            </View>
        </Pressable>
    );
}

export default MealListComponent;