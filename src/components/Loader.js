import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Layout, Metrics} from '../theme';
function Loader({isLoading}) {
  return isLoading ? (
    <ActivityIndicator
      animating={isLoading}
      color={Colors.COLOR_THEME}
      size={'large'}
      style={styles.container}
    />
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    position: Metrics.POSITION.ABSOLUTE,
    alignSelf: Metrics.ALIGN.CENTER,
    justifyContent: Metrics.JUSTIFY_CONTENT.CENTER,
    height: Layout.SCREEN_HEIGHT,
    width: Layout.SCREEN_WIDTH,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

const mapStateToProps = state => {
  return {
    isLoading: state.extraReducer.isLoading,
  };
};

export default connect(mapStateToProps, null)(Loader);
