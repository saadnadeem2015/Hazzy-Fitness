import React, { useEffect } from "react";
import { ScrollView, Text } from "react-native";
import { BLACK_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";
import KeyboardAvoidingViewCustom from "../../components/KeyboardAvoidingViewCustom";

const PrivacyPolicy = ({navigation}) => {
    useEffect(()=>{
        navigation.setOptions({
            title: "Privacy Policy",
          });
    },[]);
    return(
        <KeyboardAvoidingViewCustom style={{flex:1,backgroundColor:BLACK_COLOR}}>
            <ScrollView style={{width:'90%',alignSelf:'center'}} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:37}}>
            <Text style={[{fontSize:16,color:PRIMARY_COLOR},globalStyles.regular]}>Update: 03/03/2022</Text>
            <Text style={[{marginTop:17,textAlign:'center',fontSize:16,color:WHITE_COLOR},globalStyles.regular]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat quam maecenas tellus donec eget urna gravida hendrerit faucibus. Donec tincidunt aenean tempus ac ut varius integer. Cras dolor quam velit elementum, in felis suspendisse consequat, dictum. Pellentesque id suscipit faucibus quis nibh nullam elit. Lectus dolor vitae pharetra in et iaculis in nec. Commodo nunc tellus turpis sed dictumst. Nunc nec ut enim, diam egestas gravida risus nisi sociis. Ac orci lacus sapien curabitur id enim, dui. Commodo scelerisque vel id dui faucibus phasellus. Faucibus ac diam eu, nunc ac eget duis.
Et aliquam aliquet proin faucibus integer donec in velit. Fringilla amet at nibh facilisis risus diam id imperdiet aliquam. Elit sed mi, fusce diam tincidunt eu suspendisse non. Tempus, praesent nunc ultrices in tincidunt luctus blandit. Arcu semper lacus magna potenti auctor arcu.
Aenean aenean semper diam mi enim consequat. Integer tellus fermentum cursus metus luctus eget mattis integer. Libero sagittis dignissim lectus diam. Euismod ac.</Text>
            </ScrollView>
        </KeyboardAvoidingViewCustom>
    )
}

export default PrivacyPolicy;