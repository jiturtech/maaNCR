import React from 'react';
import {Text as RNText} from 'react-native';
import {globalStyles} from '../theme';

const Text = ({variant = 'body1', style, numberOfLines, ...rest}) => {
  return (
    <RNText
      numberOfLines={numberOfLines}
      style={[globalStyles.typography[variant], style]}
      {...rest}
    />
  );
};

export default Text;
