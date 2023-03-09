import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {Images} from '../assets';
import {Colors, scale} from '../theme';
import Text from './Text';

function DrawerHeader({title, action}) {
  return (
    <View>
      <Header
        leftComponent={
          <TouchableOpacity onPress={action}>
            <Image source={Images.MENU_ICON} style={styles.menuIcon} />
          </TouchableOpacity>
        }
        centerComponent={<Text variant="h5">{title}</Text>}
        containerStyle={{
          backgroundColor: Colors.COLOR_WHITE,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  menuIcon: {
    width: scale(25),
    height: scale(25),
    marginLeft: scale(15),
  },
});
export default DrawerHeader;
