import React from "react";
import { Text,View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PRIMARY_COLOR } from "../../../../../../assets/colors";

const Meal =()=>{
    const renderInitialItems=()=>{
        return(
            <View style={{height:90,justifyContent:'center',width:'100%',marginVertical:10,backgroundColor:'#333333',borderStyle:'dashed',borderRadius:10,borderWidth:1,borderColor:PRIMARY_COLOR}}>
                <Text style={{alignSelf:'center'}}>None</Text>
            </View>
        )
    }
    return(
        <View style={{flex:1,width:'100%',backgroundColor:'#fff'}}>
            <FlatList
            style={{flex:1,paddingHorizontal:10}}
            data={[1,2,3,4,5,6]}
            renderItem={renderInitialItems}/>
        </View>
        
    );
}
export default Meal;