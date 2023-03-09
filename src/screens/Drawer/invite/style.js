import {StyleSheet} from 'react-native';
import {Colors, CommonStyle, Metrics, scale} from '../../../theme';
const Styles = StyleSheet.create({
  profileView: {
    ...CommonStyle.shadowStyle,
    width: '100%',
    justifyContent: Metrics.ALIGN.CENTER,
  },
  content: {
    height: scale(120),
    width: scale(120),
    borderRadius: scale(60),
    alignSelf: Metrics.ALIGN.CENTER,
    marginVertical: scale(10),
  },
  prfImg: {
    height: scale(120),
    width: scale(120),
    borderRadius: scale(60),
  },
  touch: {
    position: Metrics.POSITION.ABSOLUTE,
    right: scale(-25),
    top: scale(-10),
  },
  edit: {
    height: scale(70),
    width: scale(70),
  },
  iconView: {
    position: Metrics.POSITION.ABSOLUTE,
    right: scale(15),
    top: scale(20),
    width: scale(35),
    height: scale(35),
    backgroundColor: 'rgba(255, 92, 77, 0.2)',
    borderRadius: 35 / 2,
    justifyContent: Metrics.ALIGN.CENTER,
  },
});

export default Styles;
