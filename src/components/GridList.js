import React from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '../theme';
import {BASE_URL} from '@env';

function GridListItem({data, onPress}) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <FastImage
        source={{
          uri: `${BASE_URL + 'assets/' + data.file}`,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
        style={styles.list}
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  list: {
    height:
      Dimensions.get('screen').height <= 800
        ? Dimensions.get('screen').height * 0.17
        : Dimensions.get('screen').height * 0.15,
    width: Dimensions.get('screen').width * 0.32,
    margin: 1,
    backgroundColor: Colors.COLOR_BODR,
  },
});
export default GridListItem;
