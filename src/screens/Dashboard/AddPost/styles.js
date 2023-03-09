import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics, scale} from '../../../theme';
const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.COLOR_WHITE,
    flex: 1,
  },
  hdrView: {
    height: scale(80),
    width: '100%',
    backgroundColor: Colors.COLOR_THEME_BLUE,
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
    alignItems: 'center',
  },
  postTitle: {
    color: Colors.COLOR_WHITE,
  },
  iconCross: {
    marginHorizontal: scale(10),
  },
  btnPostTitle: {
    color: Colors.COLOR_THEME,
  },
  touchPostTitle: {
    right: scale(20),
    position: Metrics.POSITION.ABSOLUTE,
    color: Colors.COLOR_THEME,
  },
  nameView: {
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
    padding: scale(15),
    marginLeft: scale(5),
  },
  userImg: {
    width: scale(60),
    height: scale(60),
    marginRight: scale(5),
    borderRadius: scale(30),
  },
  userNameView: {
    width: '48%',
    alignSelf: Metrics.ALIGN.CENTER,
  },
  userName: {
    marginLeft: scale(12),
  },
  iconDots: {
    alignSelf: Metrics.ALIGN.CENTER,
    height: scale(30),
    width: scale(103),
    borderWidth: scale(0.5),
    borderRadius: scale(50),
    alignItems: Metrics.ALIGN.CENTER,
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
  },
  dropIcon: {
    paddingHorizontal: scale(3),
  },
  inputStyle: {
    width: '95%',
    padding: scale(20),
    alignSelf: Metrics.ALIGN.CENTER,
    color: Colors.COLOR_BLACK,
  },
  postImage: {
    width: '90%',
    height: scale(337),
    alignSelf: Metrics.ALIGN.CENTER,
    borderRadius: scale(20),
  },
  footerView: {
    position: Metrics.POSITION.ABSOLUTE,
    width: '90%',
    bottom: scale(30),
    alignItems: Metrics.ALIGN.CENTER,
    alignSelf: Metrics.ALIGN.CENTER,
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
  },
  footerIcon: {
    width: scale(30),
    height: scale(30),
    marginHorizontal: scale(10),
  },
  touchSmile: {
    position: Metrics.POSITION.ABSOLUTE,
    right: scale(5),
  },
  smileyView: {
    position: 'absolute',
    backgroundColor: 'white',
    height: '100%',
    bottom: 0,
  },
  dropdown: {
    paddingHorizontal: 8,
    alignSelf: Metrics.ALIGN.CENTER,
    height: scale(30),
    width: scale(110),
    borderWidth: scale(0.5),
    borderRadius: scale(50),
  },

  placeholderStyle: {
    fontSize: scale(14),
    fontFamily: Fonts.Type.POPPINS_REGULAR,
  },
  selectedTextStyle: {
    fontSize: scale(14),
    fontFamily: Fonts.Type.POPPINS_REGULAR,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default Styles;
