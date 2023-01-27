import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";

const SelectionListPicker = ({ lable, data, selectedValue, selectValue, onClosePress,
    visible }) => {

    return (
        <Modal animationType="slide"
            transparent={true}
            visible={visible}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                <Pressable style={{ flex: 1, width: '100%' }} onPress={onClosePress} />
                <View style={{
                    width: '100%', alignSelf: 'center', backgroundColor: '#333333', paddingBottom: 25,
                    paddingTop: 15, paddingHorizontal: 25, borderTopLeftRadius: 30, borderTopRightRadius: 30
                }}>
                    <View style={{ width: '96%', alignSelf: 'center', marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text onPress={onClosePress} style={[{ color: WHITE_COLOR, fontSize: 15 }, globalStyles.semiBold]}>Cancel</Text>
                        <Text onPress={onClosePress} style={[{ color: PRIMARY_COLOR, fontSize: 15 }, globalStyles.semiBold]}>Set</Text>
                    </View>
                    <View style={{ width: '96%', backgroundColor: '#333333', paddingHorizontal: 25, paddingVertical: 5, borderColor: PRIMARY_COLOR, borderWidth: 1, alignSelf: "center" }}>
                        <Text style={[{ color: PRIMARY_COLOR, fontSize: 24 }, globalStyles.semiBold]}>{lable}</Text>

                        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                            <ScrollView>
                                {
                                    data?.map(item=>{
                                        return <Pressable onPress={()=>{selectValue(item)}} accessible={false} style={[{width:'100%',marginTop:10,height:48,alignSelf:'center',flexDirection: "row",justifyContent:'flex-start',alignItems:'center',borderRadius:6,borderColor:PRIMARY_COLOR,borderWidth:2},selectedValue?.id==item?.id && {backgroundColor:'#000'}]}>
                                            <Text style={{flex:1,marginHorizontal:10,color:PRIMARY_COLOR}}>{item?.name}</Text>
                                        </Pressable>
                                    })
                                }
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>

        </Modal>
    )
}

export default SelectionListPicker;