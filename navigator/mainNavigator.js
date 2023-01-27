import * as React from 'react';
import { SplashScreen } from "../screens/splash";
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import { createStackNavigator } from '@react-navigation/stack';
import { PRIMARY_COLOR } from '../assets/colors';
import { Icon, normalize } from 'react-native-elements';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import TokenVerificationScreen from '../screens/TokenVerification';
import ResetPasswordScreen from '../screens/ResetPassword';
import HomeScreenTabs from '../screens/HomeScreenTabs';
import ProfileScreen from '../screens/CreateProfileQuestionnare/ProfileScreen';
import QuestionaryFirst from '../screens/CreateProfileQuestionnare/Questionary';
import QuestionarySecond from '../screens/CreateProfileQuestionnare/Questionary/QuestionarySecond';
import { NavigationContainer } from '@react-navigation/native';
import MealLibrary from '../screens/HomeScreenTabs/MealLibrary';
import PasswordSetSuccessFull from '../screens/PasswordSuccessfull';
import Settings from '../screens/SettingPage';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import TermsAndCondition from '../screens/TermsAndCondition';
import FeedBackScreen from '../screens/FeedBackScreen';
import Notifications from '../screens/Notification';
import Subscriptions from '../screens/Subscriptions';
import PaymentScreen from '../screens/PaymentScreen';
import SaveCardScreen from '../screens/SaveCardScreen';
import SubscriptionConfirmationScreen from '../screens/SubscriptionConfirmationScreen';
import WorkoutVideoPlayer from '../screens/WorkoutVideoPlayer';
import CreatMeal from '../screens/HomeScreenTabs/CreateMeal';
const Stack = createStackNavigator();

const AuthStack = createStackNavigator();

const headerHide = {
  headerShadowVisible: false,
  headerTitleStyle: {
    color: '#000',
    fontWeight:"400",
  },
  headerTitle:null,
  headerBackImage:()=><Icon style={{marginLeft:5}} type='font-awesome' name="angle-left" color={PRIMARY_COLOR}/>,
  headerBackTitleVisible:false,
  headerStyle: {
    backgroundColor:'#000',
    borderBottomColor:'#000',
    borderBottomWidth:0,
    elevation: 0,
    shadowOpacity: 0,
  },
};

const headerTransparent = {
  headerBackImage:()=><Icon style={{marginLeft:15}} type='font-awesome' name="angle-left" color={PRIMARY_COLOR} />,
  headerBackTitleVisible:false,
  headerStyle: {
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTransparent: true,
  headerTitle:()=>null,
};

const normalHeader={
  headerTitleStyle: {
    color: '#000',
    fontWeight:"400"
  },
  headerBackImage:()=><Icon style={{marginLeft:5}} type='font-awesome' name="angle-left" color={"#000"}/>,
  headerBackTitleVisible:false,
  headerStyle: {
    backgroundColor:PRIMARY_COLOR
  },
}
const AuthStackNavigator = () => <AuthStack.Navigator initialRouteName='Splash'>
    <AuthStack.Screen name="Login" component={Login} options={{
            headerTitleStyle: {
              color: '#000',
              fontWeight:"400"
            },
            headerBackImage:()=><Icon style={{marginLeft:5}} type='font-awesome' name="angle-left" color={"#000"}/>,
            headerBackTitleVisible:false,
            headerStyle: {
              backgroundColor:PRIMARY_COLOR
            },
          }}/>
    <AuthStack.Screen name="Sign Up" component={SignUp} options={{
            headerTitleStyle: {
              color: '#000',
              fontWeight:"400"
            },
            headerBackImage:()=><Icon style={{marginLeft:5}} type='font-awesome' name="angle-left" color={"#000"}/>,
            headerBackTitleVisible:false,
            headerStyle: {
              backgroundColor:PRIMARY_COLOR
            },
          }}/>
          <AuthStack.Screen name="Forgot password" component={ForgotPasswordScreen} options={{
            headerTitleStyle: {
              color: '#000',
              fontWeight:"400"
            },
            headerBackImage:()=><Icon style={{marginLeft:5}} type='font-awesome' name="angle-left" color={"#000"}/>,
            headerBackTitleVisible:false,
            headerStyle: {
              backgroundColor:PRIMARY_COLOR
            },
          }}/>
          <AuthStack.Screen name="Password Reset SuccessFull" component={PasswordSetSuccessFull} options={{
            headerTitleStyle: {
              color: '#000',
              fontWeight:"400"
            },
            headerBackImage:()=><Icon style={{marginLeft:5}} type='font-awesome' name="angle-left" color={"#000"}/>,
            headerBackTitleVisible:false,
            headerStyle: {
              backgroundColor:PRIMARY_COLOR
            },
          }}/>
    <AuthStack.Screen name="Token" component={TokenVerificationScreen} options={{
            headerTitleStyle: {
              color: '#000',
              fontWeight:"400"
            },
            headerBackImage:()=><Icon style={{marginLeft:5}} type='font-awesome' name="angle-left" color={"#000"}/>,
            headerBackTitleVisible:false,
            headerStyle: {
              backgroundColor:PRIMARY_COLOR
            },
          }}/>
    <AuthStack.Screen name="Set Password" component={ResetPasswordScreen} options={{
            headerTitleStyle: {
              color: '#000',
              fontWeight:"400"
            },
            headerBackImage:()=><Icon style={{marginLeft:5}} type='font-awesome' name="angle-left" color={"#000"}/>,
            headerBackTitleVisible:false,
            headerStyle: {
              backgroundColor:PRIMARY_COLOR
            },
          }}/>
    <AuthStack.Screen name="Profile" component={ProfileScreen} options={{
      headerTitleStyle: {
        color: '#000',
        fontWeight:"400"
      },
      headerBackImage:()=><Icon style={{marginLeft:5}} type='font-awesome' name="angle-left" color={"#000"}/>,
      headerBackTitleVisible:false,
      headerStyle: {
        backgroundColor:PRIMARY_COLOR
      },
    }}/>
    <AuthStack.Screen name="QuestionaryFirst" component={QuestionaryFirst} options={{
      headerShadowVisible: false,
      headerTitleStyle: {
        color: '#000',
        fontWeight:"400",
      },
      headerTitle:null,
      headerBackImage:()=><Icon style={{marginLeft:5}} type='font-awesome' name="angle-left" color={PRIMARY_COLOR}/>,
      headerBackTitleVisible:false,
      headerStyle: {
        backgroundColor:'#000',
        borderBottomColor:'#000',
        borderBottomWidth:0,
        elevation: 0,
        shadowOpacity: 0,
      },
    }}/>
    <AuthStack.Screen name="QuestionarySecond" component={QuestionarySecond} options={headerHide}/>
</AuthStack.Navigator>

export const AppNavigator = ()=>{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}}/>
          <Stack.Screen name="AuthStack" component={AuthStackNavigator} options={{headerShown:false}}/>
          <Stack.Screen name="HomeScreenTabs" component={HomeScreenTabs} options={{headerShown:false}}/>
          <Stack.Screen name="MealLibrary" component={MealLibrary} options={normalHeader}/>
          <Stack.Screen name="Settings" component={Settings} options={headerTransparent}/>
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={normalHeader}/>
          <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} options={normalHeader}/>
          <Stack.Screen name="FeedBackScreen" component={FeedBackScreen} options={normalHeader}/>
          <Stack.Screen name="Change Password" component={ResetPasswordScreen} options={normalHeader}/>
          <Stack.Screen name="Notifications" component={Notifications} options={normalHeader}/>
          <Stack.Screen name="Subscriptions" component={Subscriptions} options={{
            headerBackImage:()=><Icon style={{marginLeft:15}} type='font-awesome' name="angle-left" color={PRIMARY_COLOR} />,
            headerBackTitleVisible:false,
            headerStyle: {
              borderWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTransparent: true,
            headerTitle:()=>null,
          }}/>
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{...normalHeader,title:'Payment'}}/>
          <Stack.Screen name="SaveCardScreen" component={SaveCardScreen} options={{...normalHeader,title:"Add Card"}}/>
          <Stack.Screen name="SubscriptionConfirmationScreen" component={SubscriptionConfirmationScreen} options={{...normalHeader,title:"User subscribed"}}/>
          <Stack.Screen name="WorkoutVideoPlayer" component={WorkoutVideoPlayer} options={headerTransparent}/>
          <Stack.Screen name="QuestionaryFirst" component={QuestionaryFirst} options={normalHeader}/>
          <Stack.Screen name="Questionary" component={QuestionarySecond} options={normalHeader}/>
          <Stack.Screen name="CreateMeal" component={CreatMeal} options={normalHeader}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}