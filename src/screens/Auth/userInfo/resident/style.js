import {StyleSheet} from 'react-native';
import {isIos} from '../../../../constants/Strings';
import {Colors, Metrics, scale} from '../../../../theme';
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
    alignItems: Metrics.ALIGN.CENTER,
    height: scale(54),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: Colors.COLOR_LIGHT_GREY,
    marginTop: scale(20),
    width: '90%',
    alignSelf: Metrics.ALIGN.CENTER,
  },
  contentView: {
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
    justifyContent: Metrics.ALIGN.SPACE_AROUND,
  },

  modalView: {
    backgroundColor: Colors.COLOR_WHITE,
    padding: scale(16),
    height: '100%',
    width: '100%',
    paddingTop: isIos ? scale(50) : scale(10),
  },
  rowContainer: {
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
    alignItems: Metrics.ALIGN.CENTER,
    paddingVertical: scale(15),
    borderRadius: scale(8),
  },

  itemText: {
    paddingLeft: scale(20),
    alignSelf: 'center',
  },
  codeText: {
    color: 'black',
    paddingHorizontal: scale(10),
  },

  flagStyle: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(40),
  },
  searchBarView: {
    height: scale(42),
    marginBottom: scale(24),
  },
  pickerView: {
    marginBottom: scale(50),
  },
  content: {
    width: '80%',
    flexDirection: 'row',
  },
  btnStyle: {
    alignSelf: Metrics.ALIGN.CENTER,
    width: '90%',
    marginVertical: scale(10),
    backgroundColor: Colors.COLOR_BLACK,
  },
});

export default Styles;
