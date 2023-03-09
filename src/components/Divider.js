import * as React from 'react';
import {View} from 'react-native';
import {Colors} from '../theme';

const Divider = ({color, inset, leadingInset, trailingInset, style}) => {
  return (
    <View
      style={[
        {
          height: 1,
          backgroundColor: color ?? Colors.COLOR_LIGHT_GREY,
          marginStart: inset ?? leadingInset,
          marginEnd: inset ?? trailingInset,
        },
        style,
      ]}
    />
  );
};

export default Divider;
