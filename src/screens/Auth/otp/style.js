import {StyleSheet} from 'react-native';
import {Colors, Metrics, scale} from '../../../theme';
const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.COLOR_WHITE,
    flex: 1,
  },

  codeFieldRoot: {
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: Metrics.ALIGN.CENTER,
  },
  cell: {
    marginHorizontal: 8,
    height: 48,
    width: 48,
    lineHeight: 50 - 5,
    textAlign: Metrics.ALIGN.CENTER,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.COLOR_BODR,
    overflow: 'hidden',
    backgroundColor: Colors.COLOR_GREY_NEW,
    color: Colors.COLOR_BLACK,
  },
  otpView: {alignItems: Metrics.ALIGN.FLEX_START},
  hdrSubView: {
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
  },
  timerTxt: {
    marginTop: 29,
    marginLeft: -15,
    color: Colors.COLOR_THEME,
  },
});

export default Styles;
