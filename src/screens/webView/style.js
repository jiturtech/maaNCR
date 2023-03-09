import {StyleSheet} from 'react-native';
import {Colors, Metrics, scale} from '../../theme';
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
  },
  loadStyle: {
    position: 'absolute',
    left: scale(0),
    top: scale(0),
    right: scale(0),
    bottom: scale(0),
    alignItems: Metrics.ALIGN.CENTER,
    justifyContent: Metrics.ALIGN.CENTER,
  },

  iconView: {
    width: '100%',
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
    alignItems: Metrics.ALIGN.CENTER,
    paddingLeft: scale(20),
  },
});

export default Styles;
