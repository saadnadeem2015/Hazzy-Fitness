import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View,Text } from "react-native";
import { Icon } from "react-native-elements";
import { BLACK_COLOR, PRIMARY_COLOR } from "../../../assets/colors";
import KeyboardAvoidingViewCustom from "../../../components/KeyboardAvoidingViewCustom";
import TrainingLibrary from "./TrainingLibrary";
const TrainingStack = createStackNavigator();
const TrainingPlan = () =>{
    const options={
        headerTitleStyle: {
          color: '#000',
          fontWeight:"400"
        },
        headerBackImage:()=><Icon style={{marginLeft:5}} type='font-awesome' name="angle-left" color={"#000"}/>,
        headerBackTitleVisible:false,
        headerStyle: {
          backgroundColor:PRIMARY_COLOR
        },
      };
    return(
        <TrainingStack.Navigator screenOptions={options}>
            <TrainingStack.Screen component={TrainingLibrary} name="Training Library"/>
        </TrainingStack.Navigator>
    )
}
export default TrainingPlan;
{/*  */}