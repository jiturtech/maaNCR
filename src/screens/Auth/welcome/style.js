import {StyleSheet} from 'react-native';
import {Colors, Metrics, Layout, globalStyles, scale} from '../../../theme';
const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.COLOR_WHITE,
    flex: 1,
  },
  image: {
    height: Layout.SCREEN_HEIGHT * 0.6,
    width: Layout.SCREEN_WIDTH,
    alignSelf: Metrics.ALIGN.FLEX_START,
  },
  titleTxt: {
    alignSelf: Metrics.ALIGN.CENTER,
    color: Colors.COLOR_BLACK,
    marginTop: scale(20),
  },
  sub_titleTxt: {
    alignSelf: Metrics.ALIGN.CENTER,
    marginTop: scale(10),
    textAlign: Metrics.ALIGN.CENTER,
    marginHorizontal: scale(20),
    color: Colors.COLOR_GREY,
  },
  btnViewStyle: {
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
    flex: 1,
    justifyContent: Metrics.JUSTIFY_CONTENT.CENTER,
    marginTop: scale(40),
  },
  btnStyle: {
    marginHorizontal: scale(15),
    backgroundColor: '#5D51FF',
  },
  outerlineStyle: {
    borderColor: Colors.OUTER_COLOR,
  },
});

export default Styles;
