import { useNavigation } from "@react-navigation/native";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Icon } from "react-native-elements";
import FastImage from "react-native-fast-image";
import { useDispatch } from "react-redux";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";
import { BackgroundImg } from "../../assets/images";
import { setWorkoutBegin } from "../../slices/mealSlice";
import FillButton from "../FillButton";
import Loading from "../Loading";

const WorkoutModal = ({modalVisible=false,setModalVisible,workout={}}) => {
  //const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading,setLoading] = useState(false);
  const startWorkout = async() =>{
    try {
      setLoading(true);
      let res = await unwrapResult(await dispatch(setWorkoutBegin({"workout_id": workout?.id})));
      setLoading(false);
      if(res){
        setModalVisible(!modalVisible);
        navigation.navigate("WorkoutVideoPlayer",{workouts:workout?.workout_items});
      }
    } catch (error) {
      setLoading(false);
    }
  }
  return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FastImage style={{width:"100%",height:'80%',borderRadius:10}} source={{uri:workout?.workout_items?.length>0?workout?.workout_items[0]?.exercise?.poster:"",priority:FastImage.priority.high}}>
                <View style={{flex:1,justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:"space-between",paddingHorizontal:15,marginTop:15}}>
                        <Text style={[{fontSize:23,color:PRIMARY_COLOR},globalStyles.semiBold]}>{workout?.workout_items?.length>0?workout?.workout_items[0]?.exercise?.title:workout?.name}</Text>
                        <Text style={[{fontSize:10,color:WHITE_COLOR},{backgroundColor:PRIMARY_COLOR,borderRadius:5,padding:1,overflow:'hidden'},globalStyles.regular]}>{`${workout?.workout_items?.length>0?workout?.workout_items[0]?.sets+"/":""}`}{`${workout?.workout_items?.length>0?workout?.workout_items[0]?.reps:""}`}</Text>
                    </View>
                    <View style={{paddingHorizontal:15,marginBottom:15}}>
                        <Text style={[{fontSize:10,color:WHITE_COLOR},globalStyles.regular]}></Text>
                        <Text style={[{fontSize:10,color:WHITE_COLOR},globalStyles.regular]}>{`${workout?.workout_items?.length>0?workout?.workout_items[0]?.sets+" set":""}`}/{`${workout?.workout_items?.length>0?workout?.workout_items[0]?.reps+" reps":""}`}</Text>
                    </View>
                </View>
            </FastImage>
            <FillButton title={workout?.workout_status==null?"Begin":"Resume"} onPress={startWorkout} style={{backgroundColor:PRIMARY_COLOR,marginTop:20,width:'100%',height:42}}/>
            <Pressable onPress={()=>setModalVisible(false)} style={{position:"absolute",top:2,right:2,alignItems:'center',justifyContent:'center',backgroundColor:"#333333aa",height:30,width:30,borderRadius:15}}>
                <Icon onPress={()=>setModalVisible(false)} color={WHITE_COLOR} name={"close"} size={15}/>
            </Pressable >
          </View>
          {loading && <Loading/>}
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'rgba(0,0,0,0.6)',
    paddingHorizontal:'8%'
  },
  modalView: {
    margin: 20,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    backgroundColor:'#333333',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:"100%",
    height:350
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default React.memo(WorkoutModal);