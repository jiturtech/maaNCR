import React from 'react';
import {Image, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {Colors, Metrics} from '../../../theme';
import {Images} from '../../../assets';
import styles from './style';
import {DrawerHeader, Text} from '../../../components';
import {goBack} from '../../../services/navigationServices';
import {View} from 'react-native';
import {Strings} from '../../../constants';

const AboutUsScreen = props => {
  return (
    <>
      <DrawerHeader
        title={'About US'}
        action={() => props.navigation.openDrawer()}
      />
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.COLOR_BLACK} hidden={false} />
        <View style={styles.content}>
          <Image source={Images.SPLASH_IMG} style={styles.image} />
          <ScrollView>
            <Text variant="body2" style={styles.textStyle}>
              {Strings.ABOUT_US}
            </Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default AboutUsScreen;
