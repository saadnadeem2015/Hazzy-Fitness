import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { BLACK_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";

const Notifications = () =>{
    const renderItem = (isOpened)=>{
        return <View style={[{width:'100%',borderColor:PRIMARY_COLOR,borderWidth:0.5,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderRadius:5,padding:10,marginVertical:8}, isOpened && {backgroundColor:'#333333'}]}>
            <Text style={[{color:WHITE_COLOR,fontSize:14},globalStyles.regular]}>New content has been upload</Text>
            <Text style={[{color:WHITE_COLOR,fontSize:14},globalStyles.regular]}>11:34</Text>
        </View>
    }
    return(
        <View style={{flex:1,backgroundColor:BLACK_COLOR,padding:10}}>
            <Text style={[{color:PRIMARY_COLOR,fontSize:16},globalStyles.regular]}>List of all notifications</Text>
            <FlatList
            style={{height:'40%'}}
            data={[1,1,1,1,1,1,1]}
            ListHeaderComponent={()=><View style={{borderBottomColor:WHITE_COLOR,borderBottomWidth:0.2,padding:10}}><Text style={[{color:WHITE_COLOR,fontSize:16,},globalStyles.regular]}>Unopened</Text></View>}
            renderItem={renderItem}/>
            <FlatList
            data={[1,1,1,1,1]}
            ListHeaderComponent={()=><View style={{borderBottomColor:WHITE_COLOR,borderBottomWidth:0.2,padding:10}}><Text style={[{color:WHITE_COLOR,fontSize:16,},globalStyles.regular]}>Opened</Text></View>}
            renderItem={()=>renderItem(false)}/>
        </View>
    )
}

export default Notifications;