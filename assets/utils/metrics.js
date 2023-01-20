import { Dimensions, Platform } from 'react-native'
import { hasNotch } from 'react-native-device-info'

const { width, height } = Dimensions.get('window')

export const Metrics = {
  spacing: [
    5,
    10,
    20,
    30,
    40,
    50,
    60,
  ],
  fontSize: [
    10,
    12,
    14,
    16,
    18,
    22,
    26,
  ],
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  radius: [
    5
  ],
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    extraLarge: 120,
    logo: 200,
  },
  duration: {
    short: 1500,
    normal: 2500,
    long: 5000,
  },
  notchOffset: hasNotch() ? 35 : 0,
}
