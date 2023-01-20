import React,{useState} from "react";
import { View,Image,ScrollView,Text, Alert } from "react-native";
import TextField from "../../components/TextField";
import KeyboardAvoidingViewCustom from "../../components/KeyboardAvoidingViewCustom";
import { AppleIcon, FbIcon, GoogleIcon, Logo1X } from "../../assets/images";
import FillButton from "../../components/FillButton";
import RadioBox from "../../components/RadioBox";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import SocialLogin from "../../components/SocialLoginButtons";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { authSignUp,authProfile } from "../../slices/authSlice";
import { mapErrorMessage } from "@modules/login/auth/utils";
import Loading from "../../components/Loading";
import { getProfile } from "../../assets/services/api";

const SignUp = ({navigation})=>{
    const dispatch = useDispatch();
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [cPassword,setCPassword] = useState("");
    const [checkValue,setCheckValue] = useState(false);
    const [loading,setLoading] = useState(false);
    const [passwordShow,setPasswordShow] = useState(true);
    const [cPasswordShow,setCPasswordShow] = useState(true);
    const onSignUp = async() =>{
        if(email == ""){
            Alert.alert("Alert","Please enter valid email");
        } else if(password==""){
            Alert.alert("Alert","Please enter password");
        } else if(cPassword==""){
            Alert.alert("Alert","Please enter confirm password");
        } else if(password!=cPassword){
            Alert.alert("Alert","Confirm password must be same as password.");
        } else if(!checkValue){
            Alert.alert("Alert","Please check Terms & Conditions and Privacy-Policy.");
        } else {
            try {
                let data = {
                    "email": email,
                    "username":username,
                    "password": password
                }
                setLoading(true)
                let res = await unwrapResult(await dispatch(authSignUp(data)))
                let res1 = await unwrapResult(await dispatch(authProfile()))
                setLoading(false)
                navigation.navigate("Profile")
            } catch (error) {
                setLoading(false)
                Alert.alert("Error",mapErrorMessage(error)?.message);
            }
            
        }
    }

    return (
        <KeyboardAvoidingViewCustom keyboardVerticalOffset={0}>
            <ScrollView style={{ flex: 1,backgroundColor:"#000" }}>
                <View style={{alignSelf:'center',width:"20%",marginVertical:28}}>
                    <Image style={{alignSelf:'center'}}  source={Logo1X}/>
                </View>
                
                <TextField keyboardType={'email-address'} value={email} onChangeText={setEmail} lable="Email" icon="envelope"/>
                <TextField value={username} onChangeText={setUsername} lable="Username" icon="user"/>
                <TextField onIconPress={()=>{setPasswordShow(!passwordShow)}} secureTextEntry={passwordShow} value={password} onChangeText={setPassword} lable="Create a password" icon={!passwordShow?"eye-slash":"eye"}/>
                <TextField onIconPress={()=>{setCPasswordShow(!cPasswordShow)}} secureTextEntry={cPasswordShow} value={cPassword} onChangeText={setCPassword} lable="Confirm a password" icon={!cPasswordShow?"eye-slash":"eye"}/>

                <RadioBox onPress={()=>{setCheckValue(!checkValue)}} isChecked={checkValue} style={{width:"90%",alignSelf:'center',marginVertical:5,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                    <Text style={{color:WHITE_COLOR,fontSize:12}}>I have read <Text style={{color:PRIMARY_COLOR}}>Terms and Conditions</Text> and <Text style={{color:PRIMARY_COLOR}}>Privacy Policy</Text>.</Text>
                </RadioBox>

                <FillButton title={"Sign up"} onPress={onSignUp} style={{backgroundColor:PRIMARY_COLOR,marginVertical:24,width:'90%',height:50}}/>
                
                <SocialLogin icon={AppleIcon} lable="Sign up Via Apple"/>
                <SocialLogin icon={GoogleIcon} lable="Sign up Via Google"/>
                <SocialLogin icon={FbIcon} lable="Sign up Via Facebook"/>
            </ScrollView>
            {
                loading && <Loading/>
            }
        </KeyboardAvoidingViewCustom>
    );
}

export default SignUp;