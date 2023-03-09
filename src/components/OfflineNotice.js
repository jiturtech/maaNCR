import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Colors, Metrics, scale, verticalScale} from '../theme';

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

function OfflineNotice() {
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    NetInfo.addEventListener(netState => {
      setIsConnected(netState.isConnected);
      console.log('Index Connection type', netState.type);
      console.log('Is connected?', netState.isConnected);
    });
  }, []);

  if (!isConnected) {
    return (
      <View style={styles.view}>
        <MiniOfflineSign />
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: Colors.COLOR_RED,
    height: scale(30),
    justifyContent: Metrics.ALIGN.CENTER,
    alignItems: Metrics.ALIGN.CENTER,
    flexDirection: 'row',
    width: Metrics.screenWidth,
    position: 'absolute',
    top: verticalScale(30),
  },
  offlineText: {color: Colors.COLOR_WHITE},
  view: {
    backgroundColor: Colors.COLOR_BLACK,
    height: scale(65),
    width: Metrics.screenWidth,
    top: 0,
  },
});

export default OfflineNotice;
