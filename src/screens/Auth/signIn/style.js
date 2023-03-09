import {StyleSheet} from 'react-native';
import {Colors, Layout, Metrics, scale} from '../../../theme';
const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.COLOR_WHITE,
    flex: 1,
  },
  image: {
    height: Layout.SCREEN_HEIGHT * 0.35,
    width: Layout.SCREEN_WIDTH,
    alignSelf: Metrics.ALIGN.FLEX_START,
  },
  frgtPass: {alignSelf: Metrics.ALIGN.FLEX_END, padding: scale(16)},
});

export default Styles;
