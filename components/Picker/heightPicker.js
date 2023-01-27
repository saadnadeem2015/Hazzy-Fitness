import { Picker } from "@react-native-picker/picker"
import React, { useState } from "react"
import { Modal, View, Text, Pressable } from "react-native"
import { PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors"
import { globalStyles } from "../../assets/fonts"

const HightPicker = ({
    measuresData,
    selectedWeightUnit,
    onSelectWeightUnit,
    onValueChange,
    onClosePress,
    visible
}) => {
    const [weightVal, setWeightVal] = useState("")
    const [weightDecimalVal, setDecimalWeightVal] = useState("")

    const onWeightSelect = (item, index) => {
        setWeightVal(item)
        onValueChange(item)
    }

    const onDecimalWeightSelect = (item, index) => {
        setDecimalWeightVal(item)
        onValueChange(weightVal + "." + item)
    }

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <View
                style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "center",
                    backgroundColor: "transparent"
                }}
            >
                <Pressable style={{flex:1,width:'100%'}} onPress={onClosePress}/>
                <View style={{width:'100%',alignSelf:'center',backgroundColor:'#333333',paddingBottom:25,
                paddingTop:15,paddingHorizontal:10,borderTopLeftRadius:30,borderTopRightRadius:30}}>
                <View  style={{width:'96%',alignSelf:'center',marginBottom:5,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text onPress={onClosePress} style={[{color:WHITE_COLOR,fontSize:15},globalStyles.semiBold]}>Cancel</Text>
                        <Text onPress={onClosePress} style={[{color:PRIMARY_COLOR,fontSize:15},globalStyles.semiBold]}>Set</Text>
                    </View>
                <View
                    style={{
                        width: "100%",
                        backgroundColor: "#333333",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderColor: PRIMARY_COLOR,
                        borderWidth: 1,
                        alignSelf: "center"
                    }}
                >
                    <Text
                        style={[
                            { color: PRIMARY_COLOR, fontSize: 24 },
                            globalStyles.semiBold
                        ]}
                    >
                        Hight
                    </Text>
                    {/*   <Text style={{color:WHITE_COLOR,fontSize:14}}>Select country from the below list</Text>
                    <Text style={{color:WHITE_COLOR,fontSize:18,marginVertical:10,color:PRIMARY_COLOR,alignSelf:'center'}}>Country</Text> */}
                    <View style={{ flexDirection: "row", margin: 10 }}>
                        <Text
                            style={[
                                { color: WHITE_COLOR, fontSize: 14, flex: 1 },
                                globalStyles.regular
                            ]}
                        >
                            Select your hight
                        </Text>
                        <Text
                            style={[
                                { color: WHITE_COLOR, fontSize: 14, flex: 1 },
                                globalStyles.regular
                            ]}
                        >
                            Measure
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row", margin: 10 }}>
                        <Picker
                            style={{ color: PRIMARY_COLOR, flex: 1 }}
                            color={PRIMARY_COLOR}
                            itemTextStyle={{ fontSize: 18, color: "white" }}
                            selectedValue={weightVal}
                            onValueChange={onWeightSelect}
                        >
                            {Array.from(Array(250).keys())?.map(item => (
                                <Picker.Item
                                    color={PRIMARY_COLOR}
                                    style={[
                                        { backgroundColor: PRIMARY_COLOR },
                                        globalStyles.regular
                                    ]}
                                    key={`${item}`}
                                    label={selectedWeightUnit?.name!='cm'?`${item + 30}`:`${(item + 30)*2.54}`}
                                    value={`${item + 30}`}
                                />
                            ))}
                        </Picker>

                        <Picker
                            style={{ color: PRIMARY_COLOR, flex: 1 }}
                            color={PRIMARY_COLOR}
                            itemTextStyle={{ fontSize: 18, color: "white" }}
                            selectedValue={selectedWeightUnit?.id}
                            onValueChange={(value, index) => {
                                onSelectWeightUnit(value, index)
                            }}
                        >
                            {measuresData?.map(item => (
                                <Picker.Item
                                    color={PRIMARY_COLOR}
                                    style={[
                                        { backgroundColor: PRIMARY_COLOR },
                                        globalStyles.regular
                                    ]}
                                    key={`${item?.id}`}
                                    label={`${item?.name}`}
                                    value={item?.id}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>
                </View>
            </View>
        </Modal>
    )
}

export default HightPicker
