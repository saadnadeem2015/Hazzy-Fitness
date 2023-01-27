import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions } from "react-native";
import Video from "react-native-video";
import { BLACK_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";
import Icon from 'react-native-vector-icons/Ionicons';

const MealVideoModal = ({modalVisible,video, setModalVisible,instructions=[]}) => {
    const [openedStep,setOpenedStep] = useState({});
    const openStep = (item)=>{
        if(item?.id!=openedStep?.id){
            setOpenedStep(item);
        } else {
            setOpenedStep({})
        }
    }
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Video resizeMode="cover" repeat={true}  style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height}} source={{uri:video}}/>
            <View style={{position:'absolute',bottom:0,left:0,backgroundColor:'rgba(0,0,0,0.5)',width:'100%',borderTopRightRadius:10,borderTopLeftRadius:10,padding:15}}>
                <Text style={[{color:PRIMARY_COLOR,fontSize:16},globalStyles.semiBold]}>Instruction</Text>
                {
                        instructions?.map((item,index)=>{
                            return <Pressable onPress={()=>{openStep(item)}} style={{borderBottomWidth:0.3,paddingVertical:15,borderColor:WHITE_COLOR}}>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10}}>
                                    <Text style={[{color:WHITE_COLOR,fontSize:14},globalStyles.regular]}>Step {index+1}</Text>
                                    <Icon color={WHITE_COLOR} name={openedStep?.id==item?.id?"chevron-down-outline":"chevron-forward"} size={15}/>
                                </View>
                               {openedStep?.id==item?.id && <Text style={[{color:WHITE_COLOR,fontSize:12,paddingHorizontal:5},globalStyles.regular]}>{item?.name}</Text>}
                            </Pressable>
                        })
                    }
            </View>
            <Pressable onPress={()=>setModalVisible(false)} style={{position:"absolute",top:30,right:5,alignItems:'center',justifyContent:'center',backgroundColor:"#333333aa",height:30,width:30,borderRadius:15}}>
                <Icon onPress={()=>setModalVisible(false)} color={WHITE_COLOR} name={"close"} size={15}/>
            </Pressable >
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  modalView: {
    flex:1,
    backgroundColor: BLACK_COLOR,
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:"100%",
    alignSelf:'center',
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

export default MealVideoModal;