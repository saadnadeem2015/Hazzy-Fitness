import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View,Text } from "react-native";
import { Icon } from "react-native-elements";
import { PRIMARY_COLOR } from "../../../assets/colors";
import MealPlanPage from "./MealPlanPage";
import ViewMealPage from "./ViewMealPage";
const MealPlanStack = createStackNavigator();
const MealPlan = () =>{
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
        headerRight: () => <Icon style={{marginRight:5}} size={15} type='font-awesome' name="bell" color={"#000"}/>,
      };
    return(
        <MealPlanStack.Navigator screenOptions={options}>
            <MealPlanStack.Screen component={MealPlanPage} name="MealPlanPage"/>
            <MealPlanStack.Screen component={ViewMealPage} name="View Meal"/>
        </MealPlanStack.Navigator>
    )
}
export default MealPlan;