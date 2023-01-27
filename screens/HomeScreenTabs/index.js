import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MealPlan from './MealPlan';
import More from './More';
import TrainingPlan from './TrainingPlan';
import { PRIMARY_COLOR } from '../../assets/colors';
import { Icon } from 'react-native-elements';
import HomeScreenTabBar from '../../components/TabBar';
import DashboardStack from './Dashboard';

const Tab = createBottomTabNavigator();



const HomeScreenTabs =()=> {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}} tabBar={props =><HomeScreenTabBar {...props}/>}>
      <Tab.Screen name="Dashboard" component={DashboardStack} options={{title:"Dashboard"}}/>
      <Tab.Screen name="TrainingPlan" component={TrainingPlan} options={{title:"Training Plans"}}/>
      <Tab.Screen name="TrainingPlan2" component={TrainingPlan} options={{title:""}}/>
      <Tab.Screen name="MealPlan" component={MealPlan} options={{title:"Meal Plans"}}/>
      <Tab.Screen name="More" component={More} options={{title:"More"}}/>
    </Tab.Navigator>
  );
}

export default HomeScreenTabs;