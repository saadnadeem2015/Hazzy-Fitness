import { useHeaderHeight } from '@react-navigation/stack';
import React from 'react';
import { View, TouchableOpacity,Text } from 'react-native';
import { PRIMARY_COLOR, WHITE_COLOR } from '../../assets/colors';
import { globalStyles } from '../../assets/fonts';
//import Animated from 'react-native-reanimated';

const TopTabBar = ({ state, descriptors, navigation, position }) => {
    return (
      <View style={{ flexDirection: 'row',justifyContent:"space-around",maxWidth:'100%',height:30,marginVertical:5}}>
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
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              key={`${index}`}
              onLongPress={onLongPress}
              style={[{marginHorizontal:5,paddingVertical:5},isFocused && {borderBottomColor:PRIMARY_COLOR,borderBottomWidth:1}]}
            >
              <Text style={[{fontSize:14,textAlignVertical:'bottom',color:isFocused?PRIMARY_COLOR:WHITE_COLOR},globalStyles.regular]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  export default TopTabBar;