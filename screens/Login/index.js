import React, { useCallback, useEffect, useState } from "react";
import { View,Image,ScrollView,Text, Alert } from "react-native";
import TextField from "../../components/TextField";
import KeyboardAvoidingViewCustom from "../../components/KeyboardAvoidingViewCustom";
import { AppleIcon, FbIcon, GoogleIcon, Logo1X } from "../../assets/images";
import FillButton from "../../components/FillButton";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import SocialLogin from "../../components/SocialLoginButtons";
import RadioBox from "../../components/RadioBox";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { authGoogleSignIn, authProfile, authSignIn } from "../../slices/authSlice";
import { mapErrorMessage } from "@modules/login/auth/utils";
import Loading from "../../components/Loading";
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
const Login = ()=>{
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.auth.me);
    const [emial,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [checkValue,setCheckValue] = useState(false)
    const [loading,setLoading] = useState(false)
    const [passwordShow,setPasswordShow] = useState(true);
    useFocusEffect(useCallback(()=>{
        GoogleSignin.configure({
          forceCodeForRefreshToken:true,
            iosClientId: '1074579804228-mn5cre2l4vfo1tj64qh1csu0bumcsmmb.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
            profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
          });
    },[]));

    /* useEffect(()=>{
      if(user?.name != null){
        navigation.navigate("HomeScreenTabs")
      } else{
        navigation.navigate("Profile")
      }
    },[user]); */

    const googleSignIn = async () => {
        try {
          setLoading(true);
          await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
          const userInfo = await GoogleSignin.signIn();
          //this.setState({ userInfo });
          const tokens = await GoogleSignin.getTokens();
          //console.log(tokens,userInfo);
          let data = {
            "access_token": tokens?.accessToken,
             //"code": tokens?.idToken
          }
          let res = await unwrapResult(await dispatch(authGoogleSignIn(data)));
          console.log(res)
          setLoading(false)
        } catch (error) {
          setLoading(false)
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
            console.log("===>",error)
            Alert.alert("Error!!",mapErrorMessage(error)?.message);
          }
        }
    };

    const onLogin = async()=>{
      if(emial==""){
        Alert.alert("Alert","Please enter valid email");
      } else if(password==""){
        Alert.alert("Alert","Please enter password");
      } else {
        try {
          setLoading(true)
          let data = {email:emial,password:password}
          let res = await unwrapResult(await dispatch(authSignIn(data)))
          setLoading(false)
          getUserInfo();
          
        } catch (error) {
          console.log(error)
          setLoading(false)
          Alert.alert("Error",mapErrorMessage(error)?.message);
        }
        
      }
    }

    const getUserInfo = async() =>{
      try {
          setLoading(true)
          let res = await unwrapResult(await dispatch(authProfile()));
          setLoading(false)
          if(res.name!=null){
            navigation.navigate("HomeScreenTabs")
          } else{
            navigation.navigate("Profile")
          }
      } catch (error) {
        setLoading(false);
        Alert.alert("Error",mapErrorMessage(error)?.message);
      }
  }

  const appleSignin = async() =>{
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      console.log('appleAuthRequestResponse', appleAuthRequestResponse);
      const {
        user: newUser,
        email,
        nonce,
        identityToken,
        realUserStatus /* etc */,
      } = appleAuthRequestResponse;
      if (identityToken) {
        // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
        console.log(nonce, identityToken);
      } else {
        // no token - failed sign-in?
      }
  
      if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
        console.log("I'm a real person!");
      }
  
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.warn('User canceled Apple Sign in.');
      } else {
        console.error(error);
      }
    }
  }

    return (
        <KeyboardAvoidingViewCustom keyboardVerticalOffset={0}>
            <ScrollView style={{ flex: 1,backgroundColor:"#000" }}>
                <View style={{alignSelf:'center',width:"20%",marginVertical:28}}>
                    <Image style={{alignSelf:'center'}}  source={Logo1X}/>
                </View>
                
                <TextField value={emial} onChangeText={setEmail}  lable="Email" icon="envelope"/>
                <TextField onIconPress={()=>{setPasswordShow(!passwordShow)}} secureTextEntry={passwordShow} value={password} onChangeText={setPassword} lable="Password" icon={!passwordShow?"eye-slash":"eye"}/>
                <View style={{flexDirection:'row',width:'90%',alignSelf:'center',marginVertical:5}}>
                    <RadioBox isChecked={checkValue} onPress={()=>{setCheckValue(!checkValue)}} style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:WHITE_COLOR}}>Remember me?</Text>
                    </RadioBox>
                    <View style={{flex:1,alignItems:'flex-end',alignSelf:'center'}}>
                        <Text onPress={()=>{navigation.navigate("Forgot password")}} style={{color:WHITE_COLOR}}>Forgot Password?</Text>
                    </View>
                </View>
                
                <FillButton title={"Log In"} onPress={onLogin} style={{backgroundColor:PRIMARY_COLOR,marginTop:90,width:'90%',height:50}}/>
                <View style={{width:"90%",alignSelf:'center',margin:32,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <View style={{height:1,backgroundColor:PRIMARY_COLOR,flex:1,marginRight:5}}/>
                    <Text style={{color:WHITE_COLOR,fontSize:14}}>Continue with</Text>
                    <View style={{height:1,backgroundColor:PRIMARY_COLOR,flex:1,marginLeft:5}}/>
                </View>
                <SocialLogin onPress={appleSignin} icon={AppleIcon} lable="Sign In Via Apple"/>
                <SocialLogin onPress={googleSignIn} icon={GoogleIcon} lable="Sign In Via Google"/>
                <SocialLogin icon={FbIcon} lable="Sign In Via Facebook"/>
                <Text style={{color:WHITE_COLOR,fontSize:14,alignSelf:'center'}}>Don't have an account? <Text style={{color:PRIMARY_COLOR}} onPress={()=>{navigation.navigate("Sign Up")}}>Sign Up</Text></Text>
            </ScrollView>
            {loading && <Loading/>}
        </KeyboardAvoidingViewCustom>
    );
}

export default Login;