import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput } from "react-native";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { BLACK_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";

const SearchComponent = (props) => {
    const {filters=[],selected,onSelect,onSearch,value,onChangeText,enable,setEnable} = props;
    
    const [searchVal,setSearchVal] = useState(value);
    return(
        <View style={{}}>
            <Text style={{color:WHITE_COLOR,fontSize:16,paddingHorizontal:15}}>Search</Text>
            <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:15}}>
                <View style={{flex:9,flexDirection:'row',padding:5,borderColor:PRIMARY_COLOR,borderWidth:1,borderRadius:5}}>
                    <Icon
                        type="font-awesome-5"
                        name={'search'}
                        size={14}
                        color={PRIMARY_COLOR}
                        containerStyle={{alignSelf:'center',margin:10}}
                        />
                    <TextInput onSubmitEditing={()=>{onSearch(searchVal) }} returnKeyType="search" enablesReturnKeyAutomatically={true} style={{flex:1,marginHorizontal:10,color:WHITE_COLOR}} autoCapitalize='none' onChangeText={setSearchVal} value={searchVal}/>
                </View>
                <Icon
                    onPress={()=>{setEnable(!enable)}}
                    type="font-awesome-5"
                    name={'wifi'}
                    size={15}
                    color={BLACK_COLOR}
                    containerStyle={{alignSelf:'center',justifyContent:'center',backgroundColor:PRIMARY_COLOR,width:24,height:24,borderRadius:12,marginLeft:8}}
                    />

            </View>
            {(filters.length>0 && enable) &&
                <>
                    <Text style={[{color:PRIMARY_COLOR,fontSize:16,marginTop:20,paddingHorizontal:15},globalStyles.regular]}>Filter</Text>
                    <ScrollView horizontal={true} style={{marginTop:15}} contentContainerStyle={{paddingHorizontal:15}}>
                        {
                            filters.map(item=>{
                                return(
                                    <Pressable onPress={()=>{onSelect(item)}} style={[{height:40,borderColor:PRIMARY_COLOR,borderWidth:0.5,marginRight:10,borderRadius:5,justifyContent:'center'},selected?.id==item.id && {backgroundColor:PRIMARY_COLOR}]}>
                                        <Text style={[{color:PRIMARY_COLOR,paddingVertical:10,paddingHorizontal:15,fontSize:12},globalStyles.regular,selected?.id==item.id &&{color:BLACK_COLOR}]}>{item?.name}</Text>
                                    </Pressable>
                                )
                            })
                        }
                    </ScrollView>
                </>
            }
        </View>
    )
}

export default SearchComponent;