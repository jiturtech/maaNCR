import {StyleSheet} from 'react-native';
import {Colors, scale} from '../../../theme';
const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.COLOR_WHITE,
    flex: 1,
  },
  searchBarView: {
    height: scale(42),
    marginVertical: scale(20),
    marginHorizontal: scale(20),
  },
  contentContainerStyle: {
    paddingBottom: '22%',
    backgroundColor: Colors.COLOR_TRANSPARENT,
  },
});

export default Styles;
