import React from "react";
import { Modal,View ,Text, TouchableOpacity} from "react-native";
import { Icon } from "react-native-elements";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import FillButton from "../FillButton";

const ImagePickerModal = ({imagePickerVisible,setImagePickerVisible}) => {
    return(<Modal animationType="slide"
    transparent={true}
    visible={imagePickerVisible}
    >
        <View style={{flex:1,justifyContent:'flex-end'}}>
            <View style={{height:'40%',width:'100%',backgroundColor:'#333333',borderTopRightRadius:30,borderTopLeftRadius:30,alignItems:'center'}}>
                <Text style={{fontSize:30,color:PRIMARY_COLOR,marginVertical:20}}>Upload</Text>
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:"90%",padding:20,borderColor:WHITE_COLOR,borderBottomWidth:0.18}}>
                    <Text style={{color:PRIMARY_COLOR,fontSize:15}}>Take photo or Video</Text>
                    <Icon
                        type="foundation"
                        name={'camera'}
                        size={14}
                        color={PRIMARY_COLOR}
                        containerStyle={{alignSelf:'center'}}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:"90%",padding:20,borderColor:WHITE_COLOR,borderBottomWidth:0.18}}>
                    <Text style={{color:PRIMARY_COLOR,fontSize:15}}>Photo Library</Text>
                    <Icon
                        type="font-awesome-5"
                        name={'images'}
                        size={14}
                        color={PRIMARY_COLOR}
                        containerStyle={{alignSelf:'center'}}
                    />
                </TouchableOpacity>
                <FillButton onPress={()=>{setImagePickerVisible(!imagePickerVisible);}} title={"Cancel"} style={{backgroundColor:PRIMARY_COLOR,marginTop:30,width:'90%',height:42}}/>
            </View>
        </View>
    </Modal>)
}

export default ImagePickerModal;