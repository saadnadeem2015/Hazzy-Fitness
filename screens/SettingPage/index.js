import { mapErrorMessage } from "@modules/login/auth/utils";
import { useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/stack";
import React, { useState } from "react";
import { Alert, Modal, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";
import { BackgroundImg, CHANGE_PASSWORD, FEEDBACK, FOOD, GYM, PRIVACY, SETTING, TERMS } from "../../assets/images";
import BackgroundContainer from "../../components/BackgroundImage";
import FillButton from "../../components/FillButton";
import MenuButton from "../../components/MenuButton";
import UserDetailComponent from "../../components/UserDetailComponent";
import { logout } from "../../slices/authSlice";
import { reset } from "../../slices/mealSlice";

const LogoutModal = ({modalVisible,dismiss,logOut})=>{
    const navigation = useNavigation();
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
            <BackgroundContainer src={BackgroundImg} mode="cover" >
                <View style={{backgroundColor:'transparent',flex:1,justifyContent:'flex-end'}}>
                <View style={{height:'25%',width:'100%',backgroundColor:'rgba(255,255,255,0.2)',borderTopRightRadius:40,borderTopLeftRadius:40,alignItems:'center'}}>
                    <Text style={[{fontSize:30,color:PRIMARY_COLOR,marginHorizontal:'10%',alignSelf:'center',marginTop:35},globalStyles.regular]}>Log out</Text>
                    <Text style={[{fontSize:14,color:WHITE_COLOR,marginHorizontal:'10%',alignSelf:'center',marginVertical:25},globalStyles.regular]}>Are you sure you want to Log Out?</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                        <FillButton title={'Yes'} onPress={logOut} style={{borderColor:PRIMARY_COLOR,borderWidth:1,width:'40%',height:38,marginRight:5}} textStyle={{color:PRIMARY_COLOR}}/>
                        <FillButton title={'No'} onPress={()=>{dismiss(true);}} style={{backgroundColor:PRIMARY_COLOR,width:'40%',height:38,marginLeft:5}}/>
                    </View>
                </View>
                </View>
            </BackgroundContainer>
        </Modal>
    )
}

const Settings = ({navigation})=>{
    const dispatch = useDispatch();
    const user = useSelector(state=>state?.auth?.me);
    const [logOutModalVisible,setLogoutModalVisible] = useState(false);
    const logOut = async()=>{
        try {
            await dispatch(reset());
            await dispatch(logout());
            setLogoutModalVisible(false);
            navigation.navigate('AuthStack',{ screen: 'Sign In' })
        } catch (error) {
            Alert.alert("Error",mapErrorMessage(error)?.message);
        }
        
    }
    return(
        <BackgroundContainer src={BackgroundImg} mode="cover">
            <View style={{flex:1,marginTop:useHeaderHeight()+20,alignSelf:'center',width:'86%'}}>
                <UserDetailComponent name={user?.name.split(" ")[0]} url={user?.profile_image}/>
                <View style={{flex:1,marginRight:15}}>
                    <MenuButton onPress={()=>{navigation.navigate("PrivacyPolicy")}} label={"Privacy policy"} icon={PRIVACY}/>
                    <MenuButton onPress={()=>{navigation.navigate("TermsAndCondition")}} label={"Terms and Conditions"} icon={TERMS}/>
                    <MenuButton onPress={()=>{navigation.navigate("Change Password",{tokenId:""})}} label={"Change password"} icon={CHANGE_PASSWORD}/>
                </View>
                <FillButton title={"Logout"} onPress={()=>{setLogoutModalVisible(!logOutModalVisible)}} style={{backgroundColor:PRIMARY_COLOR,marginVertical:50,width:'100%',height:50}}/>
                
            </View>
            <LogoutModal modalVisible={logOutModalVisible} dismiss={()=>{setLogoutModalVisible(!logOutModalVisible)}} logOut={logOut}/>
        </BackgroundContainer>
    )
}

export default Settings;