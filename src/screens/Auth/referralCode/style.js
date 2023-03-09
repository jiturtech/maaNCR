import {StyleSheet} from 'react-native';
import {Colors, CommonStyle, Metrics, scale} from '../../../theme';
import {Layout} from '../../../theme';
const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.COLOR_WHITE,
    flex: 1,
  },
  image: {
    height: Layout.SCREEN_HEIGHT * 0.65,
    width: Layout.SCREEN_WIDTH,
    alignSelf: Metrics.ALIGN.FLEX_START,
  },
  hdrTitleStyle: {
    alignSelf: Metrics.ALIGN.CENTER,
    textAlign: 'center',
    marginLeft: scale(10),
  },
  content: {
    ...CommonStyle.shadowStyle,
    position: 'absolute',
    backgroundColor: Colors.COLOR_WHITE,
    alignSelf: 'center',
    width: '100%',
    bottom: 0,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
  },
});

export default Styles;
