import React from "react";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Meal from "./Meal";
import TopTabBar from "../../../../../components/TopTabBar";
import { View } from "react-native";


const DashboardMealTabs = ()=>{
    const Tab = createMaterialTopTabNavigator();
    return(
        <Tab.Navigator initialRouteName="Breakfast" swipeEnabled={false} tabBar={props => <TopTabBar {...props} />}>
            <Tab.Screen component={Meal} name="Breakfast"/>
            <Tab.Screen component={Meal} name="Lunch"/>
            <Tab.Screen component={Meal} name="Dinner"/>
            <Tab.Screen component={Meal} name="Snack"/>
        </Tab.Navigator>
        
    );
}

export default DashboardMealTabs;