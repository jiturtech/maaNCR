import {StyleSheet} from 'react-native';
import {Colors, Metrics, scale} from '../../../theme';
const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.COLOR_WHITE,
    flex: 1,
  },
  btnStyle: {
    alignSelf: 'center',
    width: '90%',
    marginVertical: scale(10),
  },
  contentView: {
    alignSelf: Metrics.ALIGN.CENTER,
    marginVertical: scale(10),
  },
  btnText: {
    color: Colors.COLOR_BLACK,
  },
});

export default Styles;
