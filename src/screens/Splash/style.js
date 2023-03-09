import {StyleSheet} from 'react-native';
import {Colors, Metrics, Layout} from '../../theme';
const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.COLOR_WHITE,
    flex: 1,
    justifyContent: Metrics.JUSTIFY_CONTENT.CENTER,
    alignItems: Metrics.ALIGN.CENTER,
  },
  image: {
    height: 245,
    width: 245,
  },
});

export default Styles;
