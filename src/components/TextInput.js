/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {TextInput as RNTextInputPaper} from 'react-native-paper';
import {iconSize} from '../constants/Const';
import {Colors, Metrics, moderateScale, scale} from '../theme';
import Text from './Text';
import {Const} from '../constants';

const TextInput = ({
  value,
  onChangeText,
  label,
  maxLength,
  keyboardType,
  showRightIcon,
  showPassword,
  onPressRightIcon,
  showDropDown,
  isError,
  placeholder,
  onFocus,
  helperText,
  returnKeyType,
  onEndEditing,
  onSubmitEditing,
  dropIcon = 'chevron-down',
  width = '90%',
  editable,
  isReferCode,
  referrerName,
  isReferCodeSuccess,
  style,
  isHalfField = false,
}) => {
  const styles = StyleSheet.create({
    input: {
      backgroundColor: Colors.COLOR_WHITE,
      height: scale(50),
      width: width,
      alignSelf: Metrics.ALIGN.CENTER,
      marginTop: scale(15),
    },
    visible: {
      position: Metrics.POSITION.ABSOLUTE,
      right: isHalfField ? 0 : 25,
      bottom: scale(0),
      height: scale(50),
      width: scale(50),
      zIndex: 10,
      justifyContent: 'center',
    },
    errorText: {
      color: isReferCode
        ? isReferCodeSuccess
          ? Colors.COLOR_RED
          : Colors.COLOR_GREEN
        : Colors.COLOR_RED,
      marginLeft: scale(5),
      alignSelf: isReferCode && 'center',
    },
    errorView: {
      flexDirection: 'row',
      alignSelf: Metrics.ALIGN.CENTER,
      width: '80%',
      left: scale(-20),
    },
    codeStyle: {
      position: Metrics.POSITION.ABSOLUTE,
      right: moderateScale(35),
      bottom: 14,
      flexDirection: 'row',
    },
  });

  const RightIcon = (
    name,
    type,
    size = iconSize.size22,
    color = Colors.COLOR_DARK_GREY,
  ) => (
    <Icon
      name={name}
      type={type}
      size={size}
      onPress={onPressRightIcon}
      color={color}
    />
  );

  const ShowPasswordView = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.visible}
        onPress={onPressRightIcon}>
        {RightIcon(
          showPassword ? 'eye-off' : showDropDown ? dropIcon : 'eye',
          'ionicon',
        )}
      </TouchableOpacity>
    );
  };
  function ErrorView() {
    return (
      <View style={styles.errorView}>
        <Icon
          name={'exclamationcircleo'}
          type={'antdesign'}
          size={iconSize.size16}
          color={Colors.COLOR_RED}
          style={{padding: 5}}
        />
        <Text variant={Const.body2} style={styles.errorText}>
          {helperText}
        </Text>
      </View>
    );
  }
  function ReferCodeCheck() {
    return (
      <View style={styles.codeStyle}>
        <Icon
          name={isReferCodeSuccess ? 'circle-with-cross' : 'checkcircle'}
          type={isReferCodeSuccess ? 'entypo' : 'antdesign'}
          size={iconSize.size16}
          color={isReferCodeSuccess ? Colors.COLOR_RED : Colors.COLOR_GREEN}
          style={{padding: 5}}
        />
        <Text variant={Const.body2} style={styles.errorText}>
          {referrerName}
        </Text>
      </View>
    );
  }
  return (
    <View>
      <View>
        {showRightIcon && <ShowPasswordView />}
        <RNTextInputPaper
          editable={editable}
          onFocus={onFocus}
          autoCapitalize={false}
          maxLength={maxLength}
          value={value}
          style={[styles.input, style]}
          label={label}
          mode="outlined"
          onChangeText={onChangeText}
          secureTextEntry={showPassword}
          keyboardType={keyboardType}
          autoCorrect={false}
          placeholder={placeholder}
          returnKeyType={returnKeyType}
          onEndEditing={onEndEditing}
          onSubmitEditing={onSubmitEditing}
          theme={{
            roundness: 8,
            colors: {
              primary: Colors.INPUT_SELECT,
              placeholder: Colors.COLOR_LIGHT_GREY,
            },
          }}
        />

        {isReferCode && <ReferCodeCheck />}
      </View>
      {isError && <ErrorView />}
    </View>
  );
};

export default TextInput;
