import React from 'react';
import {Dimensions} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {getPath} from '../constants/path';
import {Colors} from '../theme';

const {width} = Dimensions.get('window');
const d = getPath(width, 80, 50, false, 0.35);

export function TabShape() {
  return (
    <Svg width={width} height="100%">
      <Path
        fill={Colors.COLOR_THEME_BLUE}
        {...{
          d,
        }}
      />
    </Svg>
  );
}
