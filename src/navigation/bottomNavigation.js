import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import images from '../assets/images';
import {InvitationModal, TabShape, Text} from '../components';
import {
  iconSize,
  tabsWithMagicBtn,
  tabsWithoutMagicBtn,
} from '../constants/Const';
import {
  Colors,
  CommonStyle,
  Fonts,
  FontSizes,
  moderateScale,
  scale,
  verticalScale,
} from '../theme';
import LocationScreen from '../screens/Dashboard/Location/locationScreen';
import EventScreen from '../screens/Dashboard/Events/eventScreen';
import ProfileUserScreen from '../screens/Dashboard/profile/profileUserScreen';
import {useEffect} from 'react';
import {navigate} from '../services/navigationServices';
import {NavigationRoutes} from '../constants';
import {isIos} from '../constants/Strings';
import {getState} from '../store/configureStore';

const {width} = Dimensions.get('screen');
const Tab = createBottomTabNavigator();

function comingSoonScreen(text) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{'comingSoon'}</Text>
    </View>
  );
}

const renderTabBarIcon = (name, focused, color) => (
  <Image
    source={name}
    style={{
      tintColor: color,
      width: scale(24),
      height: scale(24),
    }}
  />
);

function TabHome(props) {
  const {navigation, route} = props;
  const [tabIndex, setTabIndex] = useState(0);
  const [tabBarData, setTabBarData] = useState(tabsWithMagicBtn);
  const [isInviteModal, setIsInviteModal] = useState(false);
  console.log('LOCAL STORAGE====>>>', getState());
  useEffect(() => {
    setTabBarData(tabIndex !== 0 ? tabsWithMagicBtn : tabsWithoutMagicBtn);
  }, [tabIndex]);

  useEffect(() => {
    if (route?.params?.routeName === 'invite_frnds') {
      setIsInviteModal(true);
    }
  }, []);

  const customHeader = (e, isMagicBtn) => ({
    title: isMagicBtn ? 'Events' : e.description,
    headerShadowVisible: e.tabName === 'location' ? false : true,
    headerStyle: styles.headerStyle,
    headerTitleStyle: {
      fontFamily: Fonts.Type.POPPINS_SEMI_BOLD,
      fontSize: FontSizes.FONT_SIZE_MEDIUM,
      textAlign: 'center',
      width: isIos
        ? Dimensions.get('screen').width * 0.5
        : Dimensions.get('screen').width * 0.68,
    },
    // headerRight: () => <RightComponent />,
    headerLeft: () => <LeftComponent />,
    tabBarIcon: ({focused, color}) =>
      isMagicBtn
        ? renderMagicIcon()
        : renderTabBarIcon(e.iconName, focused, color),
    unmountOnBlur: true,
  });

  const renderMagicIcon = () => (
    <View style={tabIndex !== 0 && styles.parentContainer}>
      <Image source={images.MAGIC_BTN} style={styles.containerStyle} />
    </View>
  );
  function RightComponent() {
    return (
      <View style={styles.rightCompoView}>
        <Icon
          name="notifications"
          type="ionicon"
          size={iconSize.size25}
          style={styles.notiIcon}
        />
        <Icon
          name="md-chatbox-ellipses"
          type="ionicon"
          size={iconSize.size25}
          style={styles.chatIcon}
        />
      </View>
    );
  }

  function LeftComponent() {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.openDrawer();
        }}>
        <Image source={images.MENU_ICON} style={styles.menuIcon} />
      </TouchableOpacity>
    );
  }

  function MyTabBar(tabBarProps) {
    const {state, descriptors, navigation} = tabBarProps;
    setTabIndex(state.index);
    return (
      <View
        style={
          state.index !== 0
            ? styles.myTabBarParentContainerStyle
            : styles.myTabBarParentContainerStyleTwo
        }>
        {tabBarData?.map((e, i) => {
          if (e.tabName === 'magic_button') {
            return (
              <View style={styles.curveViewContainerStyle}>
                {state.index !== 0 && <TabShape />}
              </View>
            );
          }
        })}
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          // const label =
          //   options.tabBarLabel !== undefined
          //     ? options.tabBarLabel
          //     : options.title !== undefined
          //     ? options.title
          //     : route.name;

          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
            if (
              route.name !== 'MagicBtn' &&
              !isFocused &&
              !event.defaultPrevented
            ) {
              navigation.navigate(route.name);
            }
          };
          return (
            <TouchableOpacity
              onPress={onPress}
              style={styles.tabItemParentContainerStyle}
              activeOpacity={1}
              key={index}>
              <View style={styles.tabItemContainerStyle}>
                {options.tabBarIcon({
                  color: isFocused
                    ? Colors.COLOR_THEME
                    : Colors.COLOR_LIGHT_THEME_BLUE,
                  focused: !!isFocused,
                })}
                {/* IF WANT TO SHOW TEXT */}
                {/* {route.name !== 'MagicBtn' && (
                  <Text
                    variant="body2"
                    style={[
                      styles.tabItemTextStyle,
                      {
                        color: isFocused ? 'blue' : 'grey',
                      },
                    ]}>
                    {label}
                  </Text>
                )} */}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  const getTabFunction = tabName => {
    if (tabName === 'location') {
      return LocationScreen;
    }
    if (tabName === 'events') {
      return EventScreen;
    }
    if (tabName === 'magic_button') {
      return EventScreen;
    }
    if (tabName === 'notes') {
      return comingSoonScreen;
    }
    if (tabName === 'user') {
      return ProfileUserScreen;
    }
    return null;
  };

  const renderTabs = () => (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
      }}
      tabBar={props => MyTabBar(props)}>
      {tabBarData?.map(e => {
        if (e.tabName === 'magic_button') {
          return (
            <Tab.Screen
              name={'Make a Post'}
              component={getTabFunction(e.tabName)}
              initialParams={{routeName: e.description}}
              options={customHeader(e, true)}
            />
          );
        }
        return (
          <Tab.Screen
            name={e.description}
            component={getTabFunction(e.tabName)}
            options={customHeader(e, false)}
            initialParams={{routeName: e.description}}
          />
        );
      })}
    </Tab.Navigator>
  );

  return (
    <>
      <View style={styles.parentContainerStyle}>{renderTabs()}</View>
      <InvitationModal
        visible={isInviteModal}
        onCloseModal={() => setIsInviteModal(false)}
        status="failure"
        onPress={() => {
          setIsInviteModal(false);
          setTimeout(() => {
            navigate(NavigationRoutes.INVITE_SCREEN);
          }, 500);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  parentContainerStyle: {
    flex: 1,
  },
  myTabBarParentContainerStyle: {
    ...CommonStyle.shadowStyle,
    flexDirection: 'row',
    width,
    position: 'absolute',
    height: scale(70),
    bottom: 0,
    alignItems: 'center',
  },
  myTabBarParentContainerStyleTwo: {
    ...CommonStyle.shadowStyle,
    flexDirection: 'row',
    width,
    position: 'absolute',
    height: scale(70),
    bottom: 0,
    alignItems: 'center',
    backgroundColor: Colors.COLOR_THEME_BLUE,
  },
  curveViewContainerStyle: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.COLOR_TRANSPARENT,
    zIndex: 0,
    height: '100%',
  },
  tabItemParentContainerStyle: {
    flex: 1,
  },
  tabItemContainerStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  tabItemTextStyle: {
    fontSize: scale(12),
  },
  containerStyle: {
    width: scale(52),
    height: scale(52),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(26),
  },
  parentContainer: {
    top: verticalScale(-35),
    backgroundColor: 'transparent',
  },
  rightCompoView: {
    flexDirection: 'row',
  },
  chatIcon: {padding: scale(5), marginHorizontal: scale(10)},
  notiIcon: {padding: scale(5)},
  menuIcon: {
    width: scale(25),
    height: scale(25),
    marginLeft: scale(15),
  },
  headerStyle: {
    backgroundColor: Colors.COLOR_WHITE,
    shadowColor: Colors.COLOR_BLACK,
    shadowOffset: {
      width: scale(4, 4),
      height: scale(4, 4),
    },
    shadowRadius: moderateScale(5),
    shadowOpacity: 0.1,
    elevation: 5,
  },
});
export default TabHome;
