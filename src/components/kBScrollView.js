import React from 'react';
import PropTypes from 'prop-types';

import {KeyboardAwareScrollView as Kasc} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform, ScrollView} from 'react-native';
// import {AppColors} from '../../constant';

/**
 * It is a component that handles keyboard appearance and automatically scrolls to focused text.
 * @props {*} param list of props used as parameters.
 * @returns It will render UIs.
 */
const KeyboardAwareScrollView = props => {
  //Destructuring all the properties.
  const {
    reference,
    enabledBottomSafeAreaInset,
    extraScrollHeight,
    extraHeight,
    children,
    nestedScrollEnabled,
    onKeyboardDidHide,
    scrollEnabled,

    // onKeyboardWillShow,
    bgColor,
  } = props;
  //GET SafeAreaInsets.
  const safeAreaInsets = useSafeAreaInsets();

  /**
   * It is used to render iOS UIs.
   */
  const renderIOSUIs = () => {
    return (
      <Kasc
        bounces={false}
        ref={reference}
        onKeyboardDidHide={onKeyboardDidHide}
        // onKeyboardWillShow={onKeyboardWillShow}
        // style={{backgroundColor: AppColors.app0D0D0D}}
        contentContainerStyle={{
          paddingBottom: enabledBottomSafeAreaInset
            ? safeAreaInsets.bottom + 10
            : 10,
          backgroundColor: bgColor,
        }}
        resetScrollToCoords={{x: 0, y: 0}}
        nestedScrollEnabled={nestedScrollEnabled}
        keyboardShouldPersistTaps="handled"
        extraHeight={extraHeight + extraScrollHeight}
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={scrollEnabled}>
        {children}
      </Kasc>
    );
  };

  /**
   * It is used to render Android UIs.
   */
  const renderAndroidUIs = () => {
    return (
      <ScrollView
        bounces={false}
        // style={{backgroundColor: AppColors.app0D0D0D}}
        style={{backgroundColor: bgColor}}
        contentContainerStyle={{
          paddingBottom: enabledBottomSafeAreaInset
            ? safeAreaInsets.bottom + 20
            : 10,
          // paddingBottom: enabledBottomSafeAreaInset
          //   ? safeAreaInsets.bottom + 120
          //   : 10,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={nestedScrollEnabled}
        showsHorizontalScrollIndicator={false}>
        {children}
      </ScrollView>
    );
  };

  return Platform.OS === 'ios' ? renderIOSUIs() : renderAndroidUIs();
};

/**
 * It used to defines number of props-type, which are used in KeyboardAwareScrollView component.
 */
KeyboardAwareScrollView.propTypes = {
  enabledBottomSafeAreaInset: PropTypes.bool.isRequired,
  reference: PropTypes.any,
  extraScrollHeight: PropTypes.number,
  extraHeight: PropTypes.number,
};

/**
 * It used to defines number of props-type default value, which are used in KeyboardAwareScrollView component.
 */
KeyboardAwareScrollView.defaultProps = {
  enabledBottomSafeAreaInset: true,
  extraScrollHeight: 0,
  extraHeight: 75 + 0,
  nestedScrollEnabled: false,
};

export default KeyboardAwareScrollView;
