import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View,Text } from "react-native";
import { Icon } from "react-native-elements";
import { PRIMARY_COLOR } from "../../../assets/colors";
import MealLibrary from "../MealLibrary";
import ViewMealPage from "../MealPlan/ViewMealPage";
import WorkoutLibrary from "../WorkoutLibrary";
import MoreMenuPage from "./MoreMenuPage";

const More = () =>{
    const Stack = createStackNavigator();
    const options={
        headerBackImage:()=><Icon style={{marginLeft:15}} type='font-awesome' name="angle-left" color={PRIMARY_COLOR} />,
        headerBackTitleVisible:false,
        headerStyle: {
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTransparent: true,
        headerTitle:()=>null,
      };

      const normalHeader={
  headerTitleStyle: {
    color: '#000',
    fontWeight:"400"
  },
  headerBackImage:()=><Icon style={{marginLeft:5}} type='font-awesome' name="angle-left" color={"#000"}/>,
  headerBackTitleVisible:false,
  headerStyle: {
    backgroundColor:PRIMARY_COLOR
  },
}
const optionsMeal={
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
        <Stack.Navigator initialRouteName="MoreMenuPage">
            <Stack.Screen component={MoreMenuPage} name="MoreMenuPage" options={options}/>
            <Stack.Screen name="Meal Library" component={MealLibrary} options={optionsMeal}/>
            <Stack.Screen name="Workout Library" component={WorkoutLibrary} options={optionsMeal}/>
            <Stack.Screen component={ViewMealPage} name="View Meal" options={optionsMeal}/>
        </Stack.Navigator>
    )
}
export default More;