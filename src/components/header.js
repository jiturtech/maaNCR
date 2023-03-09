import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Const} from '../constants';
import {Colors, Metrics, scale} from '../theme';
import Text from './Text';
const Header = ({
  hdrTitle,
  hdrSubTitle,
  prgWidth = '15%',
  showProgressBar,
  hdrTitleStyle,
  hdrSubTitleStyle,
  progBackStyle,
  underLineTxt,
  hdrTitleVariant = Const.h1,
  showUnderLineText = true,
}) => {
  const styles = StyleSheet.create({
    hdrView: {
      width: '100%',
      marginTop: scale(20),
    },
    marginLeftStyle: {
      marginLeft: scale(20),
      color: Colors.COLOR_BLACK,
    },
    prgBackStyle: {
      width: '100%',
      height: scale(7),
      backgroundColor: Colors.COLOR_HDR_LIGHT,
      marginVertical: scale(10),
    },
    prgFrontStyle: {
      width: prgWidth,
      height: scale(7),
      backgroundColor: Colors.INPUT_SELECT,
    },
    underLineStyle: {
      textDecorationLine: 'underline',
      marginLeft: showUnderLineText ? scale(10) : scale(20),
    },
    hdrSubView: {
      flexDirection: showUnderLineText
        ? Metrics.FLEX_DIRECTION.ROW
        : Metrics.FLEX_DIRECTION.COLUMN,
    },
  });
  return (
    <View style={styles.hdrView}>
      {showProgressBar && (
        <View style={[styles.prgBackStyle, progBackStyle]}>
          <View style={styles.prgFrontStyle} />
        </View>
      )}
      <Text
        variant={hdrTitleVariant}
        style={[styles.marginLeftStyle, hdrTitleStyle]}>
        {hdrTitle}
      </Text>
      <View style={styles.hdrSubView}>
        <Text style={[styles.marginLeftStyle, hdrSubTitleStyle]}>
          {hdrSubTitle}
        </Text>
        <Text style={[styles.underLineStyle, hdrSubTitleStyle]}>
          {underLineTxt}
        </Text>
      </View>
    </View>
  );
};

export default Header;
