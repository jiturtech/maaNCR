import {StyleSheet} from 'react-native';
import {
  Colors,
  CommonStyle,
  FontSizes,
  horizontalScale,
  Metrics,
  moderateScale,
  scale,
} from '../../../theme';

const styles = StyleSheet.create({
  markerContainer: {
    width: scale(45),
    height: scale(45),
    justifyContent: Metrics.ALIGN.CENTER,
    alignItems: Metrics.ALIGN.CENTER,
  },
  userImg: {
    width: scale(40),
    height: scale(40),
    marginBottom: scale(10),
    borderRadius: scale(20),
    backgroundColor: 'red',
  },
  businessName: {
    marginVertical: scale(2),
    width: scale(150),
  },
  description: {
    width: scale(150),
  },
  address: {
    width: scale(150),
    marginVertical: scale(10),
  },
  callContainer: {
    paddingHorizontal: horizontalScale(10),
    paddingVertical: horizontalScale(5),
    backgroundColor: Colors.COLOR_GREEN,
    borderRadius: moderateScale(6),
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
    alignItems: Metrics.ALIGN.CENTER,
    position: Metrics.POSITION.ABSOLUTE,
    right: scale(5),
    top: scale(10),
  },
  callText: {
    color: Colors.COLOR_RED,
    fontSize: FontSizes.FONT_SIZE_EXTRA_SMALL,
    marginLeft: horizontalScale(5),
  },
  markerImg: {
    ...CommonStyle.shadowStyle,
    width: scale(50),
    height: scale(50),
  },
});
export default styles;
