import {Platform, StyleSheet} from 'react-native';
import {Colors, Layout, Metrics, moderateScale, scale} from '../../../theme';
const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.COLOR_WHITE,
    flex: 1,
  },
  searchBarView: {
    height: scale(42),
    marginVertical: scale(20),
    marginHorizontal: scale(20),
    position: 'absolute',
    alignSelf: Metrics.ALIGN.CENTER,
    flexDirection: 'row',
    width: '93%',
    justifyContent: 'space-evenly',
  },

  mainLabelView: {
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
    justifyContent: Metrics.ALIGN.CENTER,
  },

  indicatorStyle: {
    backgroundColor: Colors.COLOR_THEME,
    height: 5,
    width: 30,
    borderRadius: 50,
    position: 'absolute',
    bottom: -12,
  },
  tabStyle: {
    backgroundColor: Colors.COLOR_WHITE,
    width: '100%',
    alignSelf: 'center',
    top: Platform.OS === 'ios' ? 0 : '5%',
  },
});

export default Styles;
