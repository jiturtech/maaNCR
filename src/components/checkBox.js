import React from 'react';
import {CheckBox, Icon} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {Colors, Fonts, scale} from '../theme';

function Checkbox({name, check, Action}) {
  return (
    <CheckBox
      title={name}
      containerStyle={styles.containerStyle}
      textStyle={styles.textStyle}
      checkedIcon={
        <Icon
          name="radiobox-marked"
          type="material-community"
          size={20}
          color={Colors.COLOR_THEME}
        />
      }
      uncheckedIcon={
        <Icon
          name="radiobox-blank"
          type="material-community"
          size={20}
          color={Colors.COLOR_NEW_GRAY}
        />
      }
      checked={check}
      onPress={Action}
    />
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginBottom: 0,
  },
  textStyle: {
    color: Colors.COLOR_NEW_GRAY,
    fontSize: scale(16),
    fontFamily: Fonts.Type.POPPINS_REGULAR,
    fontWeight: '400',
  },
});

export default Checkbox;
