import React from 'react';
import {Text as RNText, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, globalStyles, Metrics, moderateScale, scale} from '../theme';

const Button = ({
  buttonVariant = 'filled',
  textVariant = 'body1',
  textStyle,
  buttonStyle,
  buttonTxt,
  roundedCorner = true,
  buttonWidth = '35%',
  buttonColor = Colors.COLOR_WHITE,
  onPress,
  borderColor = Colors.COLOR_THEME,
  shadow = true,
  disable,
  outlineBackgroundColor,
}) => {
  const styles = StyleSheet.create({
    buttonStyle: {
      height: buttonVariant !== 'text' ? scale(41) : null,
      backgroundColor:
        buttonVariant !== 'text'
          ? disable
            ? Colors.COLOR_THEME_OPACITY
            : Colors.INPUT_SELECT
          : Colors.COLOR_TRANSPARENT,
      justifyContent: Metrics.ALIGN.CENTER,
      alignItems: Metrics.ALIGN.CENTER,
      width: buttonWidth,
      borderRadius: roundedCorner ? scale(8) : 0,
    },
    textStyle: {
      color: buttonColor,
    },
    buttonStyleOutline: {
      height: scale(41),
      justifyContent: Metrics.ALIGN.CENTER,
      alignItems: Metrics.ALIGN.CENTER,
      width: buttonWidth,
      borderRadius: roundedCorner ? scale(8) : 0,
      borderColor: borderColor,
      borderWidth: scale(1.2),
      backgroundColor: outlineBackgroundColor,
    },
    shadowStyle: {
      shadowColor: Colors.COLOR_BLACK,
      shadowOffset: {
        width: scale(4, 4),
        height: scale(4, 4),
      },
      shadowRadius: moderateScale(5),
      shadowOpacity: 0.3,
      elevation: 5,
    },
  });
  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={[
        buttonVariant === 'outlined'
          ? styles.buttonStyleOutline
          : [styles.buttonStyle, shadow && styles.shadowStyle],
        buttonStyle,
      ]}>
      <RNText
        style={[
          globalStyles.typography[textVariant],
          textStyle,
          styles.textStyle,
        ]}>
        {buttonTxt}
      </RNText>
    </TouchableOpacity>
  );
};

export default Button;
