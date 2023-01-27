import React from "react";
import { View,Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";
import RadioBox from "../RadioBox";

const SelectionList = React.memo(({label,desc="",data,onSelect=()=>{},selected,type='radio'})=>{
    return(
        <View>
            <Text style={[{color:WHITE_COLOR,marginTop:15,fontSize:20},globalStyles.regular]}>{label}</Text>
            {desc!="" && <Text style={[{color:WHITE_COLOR,marginVertical:2,fontSize:10},globalStyles.regular]}>{desc}</Text>}
            {
                data?.map((item,index)=>{
                    if(type== 'radio'){
                        return <RadioBox onPress={()=>{onSelect(item,index)}} isChecked={item?.id==selected?.id} style={{borderColor:WHITE_COLOR+"AA",borderBottomWidth:0.4,flexDirection:'row',alignItems:'center',paddingHorizontal:5,paddingVertical:5}}>
                            <Text style={[{color:WHITE_COLOR,fontSize:12,paddingHorizontal:10},globalStyles.regular]} numberOfLines={1}>{item?.name}</Text>
                        </RadioBox>
                    } else{
                        return <TouchableOpacity onPress={()=>{onSelect(item,index)}} style={[{height:48,width:'100%',borderColor:PRIMARY_COLOR,borderWidth:1,borderRadius:5,marginTop:15,backgroundColor:item?.id==selected?.id?PRIMARY_COLOR:"#333333",flexDirection:'row',justifyContent:'space-between',alignItems:'center'} ]}>
                            <Text style={[{color:item?.id==selected?.id?"#000":PRIMARY_COLOR,fontSize:16,paddingHorizontal:12},globalStyles.regular]}>{item?.name}</Text>
                            {item?.id==selected?.id && <Icon
                                type="font-awesome-5"
                                name={"check"}
                                size={14}
                                color={'green'}
                                containerStyle={{alignSelf:'center',margin:10}}
                            />}
                        </TouchableOpacity>
                    }
                    
                })
            }
        </View>
    )
});

export default SelectionList;