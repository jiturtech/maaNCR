import {StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  FontSizes,
  Layout,
  Metrics,
  moderateScale,
  scale,
  verticalScale,
} from '../../../../theme';
const Styles = StyleSheet.create({
  genderView: {
    flexDirection: 'row',
    width: Layout.SCREEN_WIDTH >= 600 ? '90%' : '90%',
    alignSelf: Metrics.ALIGN.CENTER,
    alignItems: Metrics.ALIGN.CENTER,
    paddingLeft: 12,
    marginTop: verticalScale(20),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: Colors.COLOR_LIGHT_GREY,
  },
  genderTitle: {
    color: Colors.COLOR_LIGHT_GREY,
  },
});

export default Styles;
