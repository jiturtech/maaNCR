import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../services/navigationServices';
import SplashScreen from '../screens/Splash';
import NavigationRoutes from '../constants/NavigationRoutes';
import DrawerNavigation from './drawerNavigation';
import WelcomeScreen from '../screens/Auth/welcome/welcomeScreen';
import SignUpScreen from '../screens/Auth/signUp/signUpScreen';
import SignInScreen from '../screens/Auth/signIn/signInScreen';
import OTPScreen from '../screens/Auth/otp/otpScreen';
import PersonalScreen from '../screens/Auth/userInfo/personal/personalScreen';
import ContactScreen from '../screens/Auth/userInfo/contact/contactScreen';
import EducationScreen from '../screens/Auth/userInfo/education/educationScreen';
import ResidentScreen from '../screens/Auth/userInfo/resident/residentScreen';
import ProfessionScreen from '../screens/Auth/userInfo/profession/professionScreen';
import SocialScreen from '../screens/Auth/userInfo/social/socialScreen';
import ProfileScreen from '../screens/Auth/userInfo/profile/profileScreen';
import ForgetScreen from '../screens/Auth/findAccount/forgetScreen';
import AccountSelectionScreen from '../screens/Auth/findAccount/accountSelection';
import ChangePassScreen from '../screens/Auth/findAccount/changePassScreen';
import ReferralCodeScreen from '../screens/Auth/referralCode/referralCode';
import AddPostScreen from '../screens/Dashboard/AddPost/addPostScreen';
import InviteScreen from '../screens/Drawer/invite/inviteScreen';
import WebViewScreen from '../screens/webView/webViewScreen';
const Stack = createStackNavigator();
function MainNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={NavigationRoutes.SPLASH_SCREEN}>
        <Stack.Screen
          name={NavigationRoutes.SPLASH_SCREEN}
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationRoutes.DRAWER_NAVIGATION}
          component={DrawerNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationRoutes.WELCOME_SCREEN}
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationRoutes.SIGN_UP_SCREEN}
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationRoutes.SIGN_IN_SCREEN}
          component={SignInScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationRoutes.OTP_SCREEN}
          component={OTPScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationRoutes.PERSONAL_SCREEN}
          component={PersonalScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationRoutes.CONTACT_SCREEN}
          component={ContactScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationRoutes.EDUCATION_SCREEN}
          component={EducationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationRoutes.RESIDENT_SCREEN}
          component={ResidentScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationRoutes.PROFESSION_SCREEN}
          component={ProfessionScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationRoutes.SOCIAL_SCREEN}
          component={SocialScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={NavigationRoutes.PROFILE_SCREEN}
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationRoutes.FORGET_SCREEN}
          component={ForgetScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationRoutes.ACCOUNT_SELECTION_SCREEN}
          component={AccountSelectionScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationRoutes.CHANGE_PASS_SCREEN}
          component={ChangePassScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationRoutes.REFERRAL_SCREEN}
          component={ReferralCodeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationRoutes.ADD_POST_SCREEN}
          component={AddPostScreen}
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name={NavigationRoutes.INVITE_SCREEN}
          component={InviteScreen}
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name={NavigationRoutes.WEBVIEW_SCREEN}
          component={WebViewScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MainNavigation;
