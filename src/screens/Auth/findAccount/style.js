import {StyleSheet} from 'react-native';
import {Colors, CommonStyle, Metrics, scale} from '../../../theme';
const Styles = StyleSheet.create({
  btnStyle: {
    marginHorizontal: scale(15),
    alignSelf: Metrics.ALIGN.CENTER,
    marginTop: scale(15),
  },
  hdrTitleStyle: {
    alignSelf: Metrics.ALIGN.CENTER,
    textAlign: 'center',
    marginLeft: scale(10),
  },
  profileView: {
    ...CommonStyle.shadowStyle,
    width: '100%',
    justifyContent: Metrics.ALIGN.CENTER,
  },

  prfImg: {
    height: scale(90),
    width: scale(90),
    borderRadius: scale(60),
    alignSelf: Metrics.ALIGN.CENTER,
    marginVertical: scale(10),
  },
  nameStyle: {
    alignSelf: Metrics.ALIGN.CENTER,
    marginTop: scale(10),
  },
});

export default Styles;
