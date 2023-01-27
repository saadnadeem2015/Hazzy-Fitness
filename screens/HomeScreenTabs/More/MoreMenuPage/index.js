import React from "react";
import { View,Text, Image, StyleSheet } from "react-native";
import BackgroundContainer from "../../../../components/BackgroundImage";
import { BackgroundImg, FEEDBACK, FOOD, GYM, Logo1X, SETTING } from "../../../../assets/images";
import MenuButton from "../../../../components/MenuButton";
import { ScrollView } from "react-native-gesture-handler";
import { useHeaderHeight } from "@react-navigation/stack";
import { PRIMARY_COLOR } from "../../../../assets/colors";
import { globalStyles } from "../../../../assets/fonts";
import UserDetailComponent from "../../../../components/UserDetailComponent";
import { useSelector } from "react-redux";

const MoreMenuPage = ({navigation}) =>{
    const user = useSelector(state=>state?.auth?.me);
    return(
        <BackgroundContainer src={BackgroundImg} mode="cover">
            <ScrollView style={{marginTop:useHeaderHeight()+20,alignSelf:'center',width:'90%'}}>
                <UserDetailComponent name={user?.name.split(" ")[0]} url={user?.profile_image}/>
                <View style={{marginRight:15}}>
                    <MenuButton onPress={()=>{navigation.navigate("Meal Library",{callback:()=>{},from:'more'})}} label={"Meal library"} icon={FOOD}/>
                    <MenuButton onPress={()=>{navigation.navigate("Workout Library",{callback:()=>{}})}} label={"Workout library"} icon={GYM}/>
                    <View style={{alignItems:'center',marginVertical:25}}>
                        <Text style={[styles.largeText,globalStyles.regular]}>CARVE</Text>
                        <Text style={[styles.smallText,globalStyles.regular]}>YOUR BODY</Text>
                    </View>
                    <MenuButton onPress={()=>{navigation.navigate("Subscriptions")}} label={"Subscription"} icon={FEEDBACK}/>
                    <MenuButton onPress={()=>{navigation.navigate("FeedBackScreen")}} label={"Send feedback"} icon={FEEDBACK}/>
                    <MenuButton onPress={()=>{navigation.navigate("Settings")}} label={"Settings"} icon={SETTING}/>
                </View>
            </ScrollView>
        </BackgroundContainer>
    )
}
export default MoreMenuPage;
const styles = StyleSheet.create({
    largeText:{color:PRIMARY_COLOR,textAlign:'center',fontSize:68,opacity:0.5},
    smallText:{color:PRIMARY_COLOR,textAlign:'center',fontSize:30,opacity:0.5,letterSpacing:5}
});