import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {Colors, Fonts, Metrics, scale} from '../theme';
import Text from './Text';
import {Const} from '../constants';
import {trimWhiteSpace} from '../constants/Common';
import {isIos} from '../constants/Strings';
import {iconSize} from '../constants/Const';
import Divider from './Divider';
import SearchBar from './SearchBar';
import {Icon} from 'react-native-elements';

const CountryPicker = props => {
  const {
    visible,
    fieldContainerStyle,
    value,
    keyboardType,
    onCancel,
    setPickerVisibility,
    onChange,
    onSelectCountry,
    pickerData,
    placeholder,
    countryCode,
    flag,
  } = props;

  const [search, setSearch] = useState('');
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    setCountryList(pickerData);
  }, [pickerData]);

  const onChangeText = text => {
    setSearch(text);
    if (trimWhiteSpace(text)) {
      setCountryList([...countryList]);
    } else {
      const filteredData = countryList?.filter(x =>
        x?.name?.toLowerCase().includes(text.toLowerCase()),
      );

      setCountryList([...filteredData]);
    }
  };
  const onClose = () => {
    onChangeText('');
    onCancel();
  };

  return (
    <View style={[styles.container, fieldContainerStyle]}>
      <Modal animationType="slide" transparent visible={visible}>
        <View style={styles.modalView}>
          <View style={styles.searchBarView}>
            <SearchBar
              variant="active"
              onPressClose={onClose}
              label="Search country"
              onPressClear={() => onChangeText('')}
              onChangeText={text => onChangeText(text)}
              value={search}
              color={Colors.COLOR_GREY}
            />
          </View>
          <ScrollView>
            <View style={styles.pickerView}>
              {countryList.map(item => (
                <>
                  <TouchableOpacity
                    style={[
                      styles.rowContainer,
                      {
                        backgroundColor:
                          countryCode === item.dial_code
                            ? Colors.COLOR_THEME_OPACITY
                            : null,
                      },
                    ]}
                    onPress={() => {
                      onSelectCountry(item.dial_code, item.flag);
                      onChangeText('');
                    }}>
                    <Text style={styles.codeText}>{item.flag}</Text>
                    <View style={styles.content}>
                      <Text variant={Const.caption} style={styles.itemText}>
                        {`(${item.dial_code})`}
                      </Text>
                      <Text
                        variant={Const.h4}
                        style={[styles.itemText, {width: '80%'}]}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {countryCode !== item.dial_code && <Divider />}
                </>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Text style={styles.codeText}>{flag}</Text>
      <Icon
        name="chevron-down"
        size={iconSize.size16}
        color={Colors.COLOR_GREY}
        type="entypo"
        onPress={setPickerVisibility}
      />
      <View style={styles.separator} />
      <Text variant={Const.body1} style={[styles.codeText]}>
        {countryCode}
      </Text>
      <TextInput
        value={value}
        style={styles.inputTxt}
        keyboardType={keyboardType || 'default'}
        onChangeText={onChange}
        placeholder={placeholder}
        underline={false}
        maxLength={10}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  pickerView: {
    marginBottom: scale(50),
  },
  content: {
    width: '80%',
    flexDirection: 'row',
  },
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
  searchBarView: {
    height: scale(42),
    marginBottom: scale(24),
  },
  separator: {
    height: scale(25),
    width: 1,
    backgroundColor: Colors.COLOR_LIGHT_GREY,
    marginHorizontal: scale(5),
  },
  inputTxt: {
    width: '55%',
    backgroundColor: Colors.COLOR_TRANSPARENT,
    left: scale(5),
    fontSize: scale(16),
    fontFamily: Fonts.Type.POPPINS_REGULAR,
    color: Colors.COLOR_BLACK,
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
});
export default CountryPicker;
