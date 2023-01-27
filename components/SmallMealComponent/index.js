import React from "react";
import { View,Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import FastImage from "react-native-fast-image";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";
import { MEAL } from "../../assets/images";
const SmallMealComponent = ({item,index,removeMeal})=>{
    console.log(item)
    return(
        <View style={{flexDirection:'row',marginVertical:5,borderRadius:10,height:89,width:'100%',backgroundColor:'#333333'}}>
            <FastImage resizeMode="stretch" style={{height:89,width:89,borderRadius:10}} source={{uri:item?.picture}}/>
            <View style={{padding:10,flex:1}}>
                <Text style={[{flex:1,color:PRIMARY_COLOR,fontSize:16},globalStyles.regular]}>{item?.title}</Text>
                <View style={{flexDirection:'row',alignItems:'center',flex:1}}>
                    <View style={{flex:1}}>
                        <Text style={[{color:WHITE_COLOR,fontSize:16},globalStyles.regular]}>{item?.calories} KCal</Text>
                    </View>
                    <View style={{flex:1}}>
                        <View style={{flexDirection:'row',flex:1,justifyContent:'space-between'}}>
                                <Text style={[{flex:1,color:WHITE_COLOR,fontSize:8},globalStyles.regular]}>Proteins</Text>
                                <Text style={[{flex:1,color:WHITE_COLOR,fontSize:8},globalStyles.regular]}>Carbs</Text>
                                <Text style={[{flex:1,color:WHITE_COLOR,fontSize:8},globalStyles.regular]}>Fat</Text>
                        </View>
                        <View style={{flexDirection:'row',flex:1,justifyContent:'space-between'}}>
                                <Text style={[{flex:1,color:WHITE_COLOR,fontSize:8},globalStyles.regular]}>{item?.protein}gm</Text>
                                <Text style={[{flex:1,color:WHITE_COLOR,fontSize:8},globalStyles.regular]}>{item?.carbohydrates}gm</Text>
                                <Text style={[{flex:1,color:WHITE_COLOR,fontSize:8},globalStyles.regular]}>{item?.fats}gm</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Icon
                onPress={()=>{removeMeal(item,index)}}
                name={'minus-circle'}
                size={18}
                color={PRIMARY_COLOR}
                style={{alignSelf:'center',top:12,right:12,position:'absolute'}}
                />
        </View>
    );
}

export default SmallMealComponent;