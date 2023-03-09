import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TextInput as RNTextInput, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {Const} from '../constants';
import {Colors, globalStyles, Metrics, scale} from '../theme';
import Button from './Button';
const SearchBar = ({
  variant = 'default',
  label,
  style,
  onFocus,
  onBlur,
  onPressMic,
  onPressClear,
  onPressClose,
  value,
  onChangeText,
  cancelIconColor,
  ...rest
}) => {
  const [typing, setTyping] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (value) {
      setTyping(true);
    } else setTyping(false);
  }, [value]);

  const handleFocus = useCallback(
    event => {
      onFocus?.(event);
      setFocused(true);
    },
    [onFocus],
  );
  const handleBlur = useCallback(
    event => {
      onBlur?.(event);
      setFocused(false);
    },
    [onBlur],
  );

  const styles = StyleSheet.create({
    searchSection: {
      flex: 1,
      flexDirection: Metrics.FLEX_DIRECTION.ROW,
      justifyContent: Metrics.ALIGN.CENTER,
      alignItems: Metrics.ALIGN.CENTER,
      borderWidth: 1,
      borderRadius: 22,
      paddingStart: 10,
      backgroundColor: Colors.COLOR_WHITE,
    },
    searchSectionActive: {
      flex: 1,
      flexDirection: Metrics.FLEX_DIRECTION.ROW,
      justifyContent: Metrics.ALIGN.CENTER,
      alignItems: Metrics.ALIGN.CENTER,
    },
    input: {
      flex: 1,
      minHeight: 42,
      paddingStart: 10,
      paddingEnd: 10,
      paddingVertical: 0,
      textAlignVertical: Metrics.ALIGN.CENTER,
    },
  });

  return (
    <View style={[styles.searchSectionActive, style]}>
      {variant !== 'default' && (
        <Icon name={'close'} onPress={onPressClose} color={cancelIconColor} />
      )}
      <View
        style={[
          styles.searchSection,
          {marginLeft: variant != 'default' ? 10 : 0},
          {paddingEnd: !typing ? 2 : 10},
          {
            borderColor: focused ? Colors.COLOR_GREY : Colors.COLOR_LIGHT_GREY,
          },
        ]}>
        <RNTextInput
          style={[styles.input, globalStyles.typography.body2]}
          placeholder={label}
          placeholderTextColor={Colors.COLOR_GREY}
          onChangeText={text => onChangeText(text)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          {...{
            ...rest,
          }}
        />
        {!typing && (
          <Icon
            name={'search'}
            type={'feather'}
            size={20}
            style={{marginRight: 20}}
          />
        )}
        {typing && (
          <Button
            buttonVariant={'text'}
            textVariant={Const.button2}
            buttonTxt={'clear'}
            onPress={onPressClear}
            buttonColor={Colors.COLOR_LIGHT_THEME_BLUE}
            buttonWidth="20%"
            shadow={false}
          />
        )}
      </View>
    </View>
  );
};

export default SearchBar;
