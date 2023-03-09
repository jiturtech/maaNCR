import {StyleSheet} from 'react-native';
import colors from './Colors';
import {Metrics, scale, moderateScale} from './scale';
const Styles = StyleSheet.create({
  container: {
    backgroundColor: colors.COLOR_WHITE,
    flex: 1,
  },
  btnStyle: {
    marginHorizontal: scale(15),
  },
  contentView: {
    alignSelf: Metrics.ALIGN.CENTER,
    marginVertical: scale(10),
  },
  btnViewStyle: {
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
    flex: 1,
    justifyContent: Metrics.JUSTIFY_CONTENT.CENTER,
    position: Metrics.POSITION.ABSOLUTE,
    bottom: scale(50),
  },
  btnStyleNew: {
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
    marginVertical: 10,
  },
  footerStyle: {justifyContent: Metrics.ALIGN.FLEX_END, flex: 1},
  shadowStyle: {
    shadowColor: colors.COLOR_BLACK,
    shadowOffset: {
      width: scale(4, 4),
      height: scale(4, 4),
    },
    shadowRadius: moderateScale(5),
    shadowOpacity: 0.3,
    elevation: 5,
  },
  btnStyleFooter: {
    alignSelf: Metrics.ALIGN.CENTER,
    width: '90%',
    marginVertical: scale(10),
  },
  contentViewFooter: {
    alignSelf: Metrics.ALIGN.CENTER,
    marginVertical: scale(10),
  },
  btnTextFooter: {
    alignSelf: Metrics.ALIGN.CENTER,
    color: colors.COLOR_THEME,
  },
  divider: {
    backgroundColor: colors.COLOR_LIGHT_GREY,
    height: scale(0.5),
    width: '90%',
    alignSelf: Metrics.ALIGN.CENTER,
    marginBottom: scale(10),
  },
  orTxt: {
    marginTop: 28,
    margin: 5,
    color: colors.COLOR_DARK_GREY,
  },
  orView: {
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
    justifyContent: Metrics.ALIGN.CENTER,
  },
  separator: {
    backgroundColor: colors.COLOR_GREY,
    height: 1,
    marginVertical: 40,
    width: '40%',
    alignSelf: Metrics.ALIGN.FLEX_START,
  },
  emptyList: {
    alignItems: Metrics.ALIGN.CENTER,
    height: '100%',
    width: '100%',
    justifyContent: Metrics.ALIGN.CENTER,
  },
  emptyImage: {
    height: scale(250),
    width: scale(250),
  },
  noteContainer: {
    borderRadius: 4,
    backgroundColor: 'rgba(255, 92, 77, 0.2)',
    padding: 8,
    marginTop: 20,
    marginHorizontal: 20,
  },
  noteTxt: {
    color: colors.COLOR_DARK_GREY,
    marginTop: 5,
  },
});

export default Styles;
