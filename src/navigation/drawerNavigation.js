import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {DrawerList} from '../components';
import {Colors, Fonts, scale} from '../theme';
import BottomNavigation from './bottomNavigation';
import LogoutScreen from '../screens/Drawer/logout/logout';
import AboutUsScreen from '../screens/Drawer/about/aboutScreen';
import RequestScreen from '../screens/Drawer/requests/requestScreen';
import DeleteAccountScreen from '../screens/Drawer/deleteAccount/deleteAccountScreen';
const Drawer = createDrawerNavigator();
function DrawerNavigation() {
  return (
    <>
      <Drawer.Navigator
        gestureHandlerProps={{enabled: false}}
        initialRouteName="Home"
        backBehavior="initialRoute"
        drawerContent={props => <DrawerList props={props} />}
        screenOptions={{
          unmountOnBlur: true,
          drawerPosition: 'left',
          drawerLabelStyle: {
            fontFamily: Fonts.Type.POPPINS_REGULAR,
            fontSize: scale(15),
          },
        }}>
        <Drawer.Screen
          name="Home"
          component={BottomNavigation}
          options={{
            headerShown: false,
            drawerActiveTintColor: Colors.COLOR_LIGHT_THEME_BLUE,
            drawerInactiveTintColor: Colors.COLOR_GREY,
          }}
        />
        {/* <Drawer.Screen
          name="Chapters"
          component={BottomNavigation}
          options={{
            headerShown: false,
            drawerActiveTintColor: Colors.COLOR_LIGHT_THEME_BLUE,
            drawerInactiveTintColor: Colors.COLOR_GREY,
          }}
        />
        <Drawer.Screen
          name="Donation Drive"
          component={BottomNavigation}
          options={{
            headerShown: false,
            drawerActiveTintColor: Colors.COLOR_LIGHT_THEME_BLUE,
            drawerInactiveTintColor: Colors.COLOR_GREY,
          }}
        /> */}
        <Drawer.Screen
          name="Requests"
          component={RequestScreen}
          options={{
            headerShown: false,
            drawerActiveTintColor: Colors.COLOR_LIGHT_THEME_BLUE,
            drawerInactiveTintColor: Colors.COLOR_GREY,
          }}
        />
        <Drawer.Screen
          name="Invite friend"
          component={BottomNavigation}
          initialParams={{routeName: 'invite_frnds'}}
          options={{
            headerShown: false,
            drawerActiveTintColor: Colors.COLOR_LIGHT_THEME_BLUE,
            drawerInactiveTintColor: Colors.COLOR_GREY,
          }}
        />
        <Drawer.Screen
          name="About app"
          component={AboutUsScreen}
          options={{
            headerShown: false,
            drawerActiveTintColor: Colors.COLOR_LIGHT_THEME_BLUE,
            drawerInactiveTintColor: Colors.COLOR_GREY,
          }}
        />
        <Drawer.Screen
          name="Delete Account"
          component={DeleteAccountScreen}
          options={{
            drawerActiveTintColor: Colors.COLOR_LIGHT_THEME_BLUE,
            drawerInactiveTintColor: Colors.COLOR_GREY,
          }}
        />
        <Drawer.Screen
          name="Logout"
          component={LogoutScreen}
          options={{
            drawerActiveTintColor: Colors.COLOR_LIGHT_THEME_BLUE,
            drawerInactiveTintColor: Colors.COLOR_GREY,
          }}
        />
      </Drawer.Navigator>
    </>
  );
}

export default DrawerNavigation;
