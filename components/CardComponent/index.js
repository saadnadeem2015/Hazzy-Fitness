import React from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import { BLACK_COLOR, PRIMARY_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";

const CardComponent = ({card,onPress=()=>{}}) => {
    const {width} = Dimensions.get('screen');
    return(
        <Pressable onPress={()=>{onPress(card)}} style={{backgroundColor:PRIMARY_COLOR,borderRadius:10,width:width*0.6,height:130,padding:20,justifyContent:'space-around',marginHorizontal:5}}>
            <Text style={[{alignSelf:'center',fontSize:15,letterSpacing:2,color:'#333333AA'},globalStyles.regular]}>•••• •••• ••• <Text style={{color:BLACK_COLOR+"AA"}}>{card?.card_number?card?.card_number:'xxxx'}</Text></Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View>
                    <Text style={[{color:'#333333AA',fontSize:10},globalStyles.regular]}>Card Holder</Text>
                    <Text style={[{color:BLACK_COLOR,fontSize:13},globalStyles.regular]}>{card?.card_holder_name?card?.card_holder_name:"ABC"}</Text>
                </View>
                <View>
                    <Text style={[{color:'#333333AA',fontSize:10},globalStyles.regular]}>Expires</Text>
                    <Text style={[{color:BLACK_COLOR,fontSize:13},globalStyles.regular]}>{card?.expiry_date_month?card?.expiry_date_month+"/"+card?.expiry_date_year:'--/--'}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default CardComponent;