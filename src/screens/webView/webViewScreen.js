import {useRoute} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, SafeAreaView, StatusBar, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {WebView} from 'react-native-webview';
import {goBack} from '../../services/navigationServices';
import {Colors} from '../../theme';
import Styles from './style';

const WebViewScreen = () => {
  const route = useRoute();
  const {headerTitle, webUrl} = route?.params;
  console.log(headerTitle);
  const renderLoad = () => {
    return (
      <ActivityIndicator
        color={Colors.COLOR_THEME}
        size="large"
        style={Styles.loadStyle}
      />
    );
  };

  return (
    <>
      <SafeAreaView style={Styles.container}>
        <StatusBar barStyle={'light-content'} hidden={true} />
        <View style={Styles.iconView}>
          <Icon
            name={'chevron-back'}
            color={Colors.COLOR_BLACK}
            type={'ionicon'}
            size={30}
            onPress={() => goBack()}
          />
        </View>

        <WebView
          source={{
            uri: webUrl,
          }}
          originWhitelist={['*']}
          startInLoadingState={true}
          renderLoading={renderLoad}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </SafeAreaView>
    </>
  );
};

export default WebViewScreen;
