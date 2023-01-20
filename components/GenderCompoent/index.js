import React from "react";
import { View,TouchableOpacity,Text,ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";

const GenderComponent = ({style,data,onPress,selected}) => {
    
    return(
        
    <View style={[{width:"90%",marginVertical:5,height:65},style]}>
        <Text style={[{color:WHITE_COLOR,marginBottom:5},globalStyles.regular]}>Sex</Text>
        <ScrollView style={{flex:1}} contentContainerStyle={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} horizontal>
            {data?.map(item=>{
                return (
                    <TouchableOpacity onPress={()=>{onPress(item)}} style={[{width:`${90/data.length}%`,padding:10,borderRadius:6},selected?.id!=item?.id ?{borderColor:PRIMARY_COLOR,borderWidth:1,backgroundColor:'#333333'}:{backgroundColor:PRIMARY_COLOR}]}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text style={[{textAlign:'center',color:selected?.id!=item?.id?PRIMARY_COLOR:'#000'},globalStyles.regular]}>
                                {item.name}
                            </Text>
                            {item?.name!="Other"&&<Icon
                                type="foundation"
                                name={item?.name=="Male"?'male-symbol':'female-symbol'}
                                size={14}
                                color={selected?.id!=item?.id?PRIMARY_COLOR:'#000'}
                                containerStyle={{alignSelf:'center'}}
                            />}
                        </View>
                        
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    </View>)
}

export default React.memo(GenderComponent);