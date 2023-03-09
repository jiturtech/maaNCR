import {Platform, StyleSheet} from 'react-native';
import {Colors, CommonStyle, Metrics, scale} from '../../../theme';
const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.COLOR_WHITE,
    flex: 1,
  },
  imgPlace: {
    width: '100%',
    height: scale(200),
  },
  content: {
    width: '100%',
    height: scale(50),
    justifyContent: Metrics.ALIGN.SPACE_BETWEEN,
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
    alignItems: Metrics.ALIGN.CENTER,
  },
  icons: {
    width: scale(40),
    height: scale(40),
    marginHorizontal: scale(15),
  },
  userImg: {
    width: scale(100),
    height: scale(100),
    alignSelf: Metrics.ALIGN.CENTER,
    top: scale(50),
    borderRadius: scale(50),
  },
  userInfo: {
    width: '100%',
    marginTop: scale(60),
    justifyContent: Metrics.ALIGN.CENTER,
  },
  userText: {
    alignSelf: Metrics.ALIGN.CENTER,
    marginVertical: scale(5),
    marginHorizontal: scale(20),
  },
  primaryView: {
    marginTop: scale(10),
    width: '100%',
    height: '100%',
  },
  contentContainerStyle: {
    paddingBottom: '23%',
    backgroundColor: Colors.COLOR_TRANSPARENT,
    marginLeft: scale(4),
  },

  profileView: {
    ...CommonStyle.shadowStyle,
    width: '100%',
    justifyContent: Metrics.ALIGN.CENTER,
  },
  content1: {
    height: scale(100),
    width: scale(100),
    borderRadius: scale(60),
    alignSelf: Metrics.ALIGN.CENTER,
    marginVertical: scale(10),
  },
  prfImg: {
    height: scale(100),
    width: scale(100),
    borderRadius: scale(50),
  },
  touch: {
    position: Metrics.POSITION.ABSOLUTE,
    right: scale(-30),
    bottom: scale(-5),
  },
  edit: {
    height: scale(70),
    width: scale(70),
  },
  mainLabelView: {
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
    justifyContent: Metrics.ALIGN.CENTER,
  },

  indicatorStyle: {
    backgroundColor: Colors.COLOR_THEME,
    height: 5,
    width: 30,
    borderRadius: 50,
    position: 'absolute',
    bottom: -12,
  },
  tabStyle: {
    backgroundColor: Colors.COLOR_WHITE,
    width: '100%',
    alignSelf: 'center',
    top: Platform.OS === 'ios' ? 0 : '5%',
  },
});

export default Styles;
