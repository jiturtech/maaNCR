import {StyleSheet} from 'react-native';
import {Colors, CommonStyle, Metrics, scale} from '../../../../theme';
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
    height: scale(100),
    width: scale(100),
    borderRadius: scale(50),
  },
  touch: {
    position: Metrics.POSITION.ABSOLUTE,
    right: scale(-15),
    top: scale(-10),
  },
  edit: {
    height: scale(70),
    width: scale(70),
  },
});

export default Styles;
