import React from 'react'
import { View, ActivityIndicator } from 'react-native';
import { PRIMARY_COLOR } from '../../assets/colors';

const Loading = ({isHeader=false}) => {

  return (
    <View style={{position:'absolute',width:'100%',height:'100%',justifyContent:'center',marginTop:isHeader?-60:0}}>
      <ActivityIndicator color={PRIMARY_COLOR} size='large' />
    </View> 
  )
}

export default Loading