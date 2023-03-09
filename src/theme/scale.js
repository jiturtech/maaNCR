import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const horizontalScale = size => (width / guidelineBaseWidth) * size;

const Metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  ALIGN: {
    LEFT: 'left',
    CENTER: 'center',
    STRETCH: 'stretch',
    FLEX_START: 'flex-start',
    FLEX_END: 'flex-end',
    SPACE_AROUND: 'space-around',
    SPACE_BETWEEN: 'space-between',
  },
  POSITION: {
    RELATIVE: 'relative',
    ABSOLUTE: 'absolute',
  },
  JUSTIFY_CONTENT: {
    FLEX_START: 'flex-start',
    FLEX_END: 'flex-end',
    CENTER: 'center',
    SPACE_AROUND: 'space-around',
    SPACE_BETWEEN: 'space-between',
    SPACE_EVENLY: 'space-evenly',
  },
  FLEX_DIRECTION: {
    ROW: 'row',
    COLUMN: 'column',
  },
  RESIZE_MODE: {
    COVER: 'cover',
    CONTAIN: 'contain',
    STRETCH: 'stretch',
    CENTER: 'center',
  },
  ICON_STYLE: {
    SMALL: {
      width: 25,
      height: 25,
    },
  },
};
export {
  guidelineBaseWidth,
  guidelineBaseHeight,
  scale,
  verticalScale,
  moderateScale,
  Metrics,
  horizontalScale,
};
