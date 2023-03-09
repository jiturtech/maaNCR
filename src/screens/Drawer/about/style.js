import {StyleSheet} from 'react-native';
import {Colors, Metrics, scale} from '../../../theme';
const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.COLOR_WHITE,
    flex: 1,
  },
  image: {
    height: scale(245),
    width: scale(245),
    position: 'absolute',
    opacity: 0.5,
  },
  content: {
    justifyContent: Metrics.ALIGN.CENTER,
    backgroundColor: Colors.COLOR_WHITE,
    flex: 1,
    alignItems: Metrics.ALIGN.CENTER,
    marginTop: scale(20),
  },
  textStyle: {
    fontWeight: '500',
    textAlign: 'justify',
    marginHorizontal: 15,
    marginBottom: 10,
    lineHeight: 25,
    color: Colors.NEW_OPACITY,
  },
});

export default Styles;
