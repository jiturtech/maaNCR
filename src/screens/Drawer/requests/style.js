import {StyleSheet} from 'react-native';
import {Colors, Metrics, Layout, CommonStyle, scale} from '../../../theme';
const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.COLOR_WHITE,
    flex: 1,
    justifyContent: Metrics.JUSTIFY_CONTENT.CENTER,
    alignItems: Metrics.ALIGN.CENTER,
  },
  image: {
    ...CommonStyle.shadowStyle,
    height: scale(200),
    width: scale(120),
    borderRadius: scale(12),
    marginLeft: scale(10),
  },
  touch: {
    ...CommonStyle.shadowStyle,
    backgroundColor: Colors.COLOR_GREY_NEW,
    width: '95%',
    marginVertical: scale(10),
    alignSelf: Metrics.ALIGN.CENTER,
    borderRadius: scale(12),
    alignItems: Metrics.ALIGN.CENTER,
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
  },
  content: {height: '100%', width: '100%'},
  btnView: {
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
    marginBottom: scale(20),
  },
  text1: {
    marginTop: scale(5),
    marginHorizontal: scale(10),
  },
  btnTxt: {marginTop: scale(15), marginHorizontal: scale(10)},
  btnStyle: {
    marginHorizontal: scale(10),
  },
  content1: {height: '90%', width: '60%'},
  imageView: {
    width: '100%',
    height: 50,
    marginLeft: 10,
    alignSelf: 'center',
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialIcon: {height: scale(30), width: scale(30), marginHorizontal: 7},
});

export default Styles;
