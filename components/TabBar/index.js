import React from 'react';
import { Image, ImageBackground, Platform, Pressable } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { PRIMARY_COLOR } from '../../assets/colors';
import {HOME1, HOME2, MEAL1, MEAL2, MORE1, MORE2, PLAN1, PLAN2, TabBG} from '../../assets/images/index';
import {globalStyles} from '../../assets/fonts/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { setMealPlan } from '../../slices/mealSlice';

const icon = ["home-outline","file-document-outline","","food-apple-outline","reorder-horizontal"
];
const HomeScreenTabBar=({ state, descriptors, navigation })=> {
  /* const dispatch = useDispatch();
  const {mealPlanUpdateMethod,onCreteMeal,mealIds} = useSelector(state=>state?.meal);
  const submitMeal = async()=>{
    try {
      let data = {
        meals_ids:mealIds
      }
      await unwrapResult(await dispatch(setMealPlan(data)))
    } catch (error) {
      
    }
  } */
  
  return (
    <ImageBackground source={TabBG} style={{backgroundColor:'#000', flexDirection: 'row',paddingBottom:Platform.OS=='ios'? 25:0,paddingTop:10,alignItems:'flex-end' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        if(index==0){
          return(
            <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1,alignItems:'center' }}
          >
           <Image resizeMode='contain' style={{width:25,height:25,marginBottom:2}} source={isFocused?HOME2:HOME1}/>
            <Text style={[{ color: isFocused ? '#000' : '#333333',fontSize:8 },globalStyles.regular]}>
              {label}
            </Text>
          </TouchableOpacity>
          )
        } else if(index==1){
          return(
            <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1,alignItems:'center' }}
          >
           <Image resizeMode='contain' style={{width:25,height:25,marginBottom:2}} source={isFocused?PLAN2:PLAN1}/>
            <Text style={[{ color: isFocused ? '#000' : '#333333',fontSize:8 },globalStyles.regular]}>
              {label}
            </Text>
          </TouchableOpacity>
          )
        } else if(index==3){
          return(
            <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1,alignItems:'center' }}
          >
           <Image resizeMode='contain' style={{width:25,height:25,marginBottom:2}} source={isFocused?MEAL2:MEAL1}/>
            <Text style={[{ color: isFocused ? '#000' : '#333333',fontSize:8 },globalStyles.regular]}>
              {label}
            </Text>
          </TouchableOpacity>
          )
        } else if(index==4){
          return(
            <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1,alignItems:'center' }}
          >
           <Image resizeMode='contain' style={{width:25,height:25,marginBottom:2}} source={isFocused?MORE2:MORE1}/>
            <Text style={[{ color: isFocused ? '#000' : '#333333',fontSize:8 },globalStyles.regular]}>
              {label}
            </Text>
          </TouchableOpacity>
          )
        }

      

        return (
          index==2 ? <View style={{flex: 1}}/>:<TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1,alignItems:'center' }}
          >
            {
              index == 0 &&
              <Image style={{width:40,height:40}} source={isFocused?HOME2:HOME1}/>
            }
            {index !== 0 &&<><MaterialCommunityIcons size={25}  name={icon[index]} color={isFocused ? '#000' : '#333333AA'}/>
            <Text style={[{ color: isFocused ? '#000' : '#333333',fontSize:8 },globalStyles.regular]}>
              {label}
            </Text></>}
          </TouchableOpacity>
        );
      })}

     {/* {onCreteMeal&& <View accessible={false} style={{width:'100%',position:'absolute',top:-15}}>
        <Pressable onPress={()=>{submitMeal()}} style={{width:40,height:40,borderRadius:20,backgroundColor:PRIMARY_COLOR,alignSelf:'center',justifyContent:'center'}}>
          <MaterialCommunityIcons style={{alignSelf:'center'}} size={25}  name={"arrow-right"} color={'#000'}/>
        </Pressable>
      </View>} */}
    </ImageBackground>
  );
}

export default React.memo(HomeScreenTabBar);