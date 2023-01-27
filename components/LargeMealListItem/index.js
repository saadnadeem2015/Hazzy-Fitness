import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { BLACK_COLOR, LIGHT_TEXT_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";

const LargeMealListItem = ({item,callback}) =>{
    return(
        <Pressable onPress={()=>{callback(item);}} style={{width:'90%',marginVertical:15,borderColor:LIGHT_TEXT_COLOR,borderBottomWidth:1,alignSelf:'center'}}>
            <View style={{width:'100%',height:180,borderRadius:10}}>
                <FastImage resizeMode="stretch" style={{width:'100%',height:"100%"}} source={{uri:item?.picture}}/>
            </View>
            
            <Text style={[{color:PRIMARY_COLOR,fontSize:18,marginTop:10},globalStyles.semiBold]}>{item?.title}</Text>
            <View style={{flexDirection:'row',marginVertical:15}}>
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
            </View>
        </Pressable>
    )
}

export default LargeMealListItem;