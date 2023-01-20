import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";

const CountryPicker = ({ pickerVisible, data, selectedCountry, onChange, onClosePress }) => {

    return (
        <Modal animationType="slide"
            transparent={true}
            visible={pickerVisible}>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'transparent' }}>
                <Pressable style={{ flex: 1, width: '100%' }} onPress={onClosePress} />
                <View style={{
                    width: '100%', alignSelf: 'center', backgroundColor: '#333333', paddingBottom: 25,
                    paddingTop: 15, paddingHorizontal: 25, borderTopLeftRadius: 30, borderTopRightRadius: 30
                }}>
                    <View style={{ width: '96%', alignSelf: 'center', marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text onPress={onClosePress} style={[{ color: WHITE_COLOR, fontSize: 15 }, globalStyles.semiBold]}>Cancel</Text>
                        <Text onPress={onClosePress} style={[{ color: PRIMARY_COLOR, fontSize: 15 }, globalStyles.semiBold]}>Set</Text>
                    </View>
                    <View style={{ width: '96%',alignSelf: 'center', backgroundColor: '#333333', paddingHorizontal: 25, paddingVertical: 5, borderColor: PRIMARY_COLOR, borderWidth: 1 }}>
                        <Text style={[{ color: PRIMARY_COLOR, fontSize: 24 }, globalStyles.semiBold]}>Country</Text>
                        <Text style={{ color: WHITE_COLOR, fontSize: 14 }}>Select country from the below list</Text>
                        <Text style={{ color: WHITE_COLOR, fontSize: 18, marginVertical: 10, color: PRIMARY_COLOR, alignSelf: 'center' }}>Country</Text>
                        <Picker
                            style={{ color: PRIMARY_COLOR }}
                            color={PRIMARY_COLOR}
                            itemTextStyle={{ fontSize: 18, color: 'white' }}
                            selectedValue={selectedCountry?.id}
                            onValueChange={(value, index) => { onChange(value, index) }}
                        >
                            {data?.map(item => <Picker.Item color={selectedCountry?.id == item?.id ? PRIMARY_COLOR : WHITE_COLOR} style={[{ backgroundColor: PRIMARY_COLOR }, globalStyles.regular]} key={`${item?.id}`} label={item?.name} value={item?.id} />)}
                        </Picker>
                    </View>
                </View>
            </View>

        </Modal>
    )
}

export default CountryPicker;
/*  */

/*  */