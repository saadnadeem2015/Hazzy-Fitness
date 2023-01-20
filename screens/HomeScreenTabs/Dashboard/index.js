import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View,Text } from "react-native";
import { Icon } from "react-native-elements";
import { PRIMARY_COLOR } from "../../../assets/colors";
import QuestionaryFirst from "../../CreateProfileQuestionnare/Questionary";
import QuestionarySecond from "../../CreateProfileQuestionnare/Questionary/QuestionarySecond";
import CreatMeal from "../CreateMeal";
import MealLibrary from "../MealLibrary";
import ViewMealPage from "../MealPlan/ViewMealPage";
import WorkoutLibrary from "../WorkoutLibrary";
import DashboardScreen from "./DasboardScreen";
import DashboardScreenProto from "./DashboardScreenProto";

const Stack = createStackNavigator();
const screenOptions = {
    headerShadowVisible: false,
      headerTitleStyle: {
      color: '#000',
      fontWeight:"400",
      fontSize:14,
      fontFamily: "Inter-Regular",
    },
    headerBackImage:()=><Icon style={{marginLeft:5}} type='font-awesome' name="angle-left" color={"#000"}/>,
    headerBackTitleVisible:false,
    headerStyle: {
      backgroundColor:PRIMARY_COLOR,
    },
  }
const DashboardStack = () =>{
    return(
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="Dashboard" component={DashboardScreenProto}/>
            {/* <Stack.Screen name="CreateMeal" component={CreatMeal}/> */}
            {/* <Stack.Screen name="QuestionaryFirst" component={QuestionaryFirst} headerMode={'none'}/>
            <Stack.Screen name="Questionary" component={QuestionarySecond} headerMode={'none'}/> */}
            <Stack.Screen component={ViewMealPage} name="View Meal" headerMode={'none'}/>
            <Stack.Screen name="Meal Library" component={MealLibrary} headerMode={'none'}/>
            <Stack.Screen name="Workout Library" component={WorkoutLibrary} headerMode={'none'}/>
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} headerMode={'none'}/>
        </Stack.Navigator>
    )
}
export default DashboardStack;