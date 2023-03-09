import * as React from 'react';
import {ImageBackground, Modal, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {Images} from '../assets';
import {Const, Strings} from '../constants';
import {iconSize} from '../constants/Const';
import {Colors, CommonStyle, Metrics, scale} from '../theme';
import Button from './Button';
import Text from './Text';

const InvitationModal = ({visible, onCloseModal, onPress, status}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.NEW_OPACITY,
      justifyContent: Metrics.ALIGN.FLEX_END,
    },
    content: {
      height: scale(380),
      width: '100%',
      backgroundColor: Colors.COLOR_WHITE,
      borderRadius: scale(20),
    },
    imageBackground: {
      height: status === 'success' ? scale(293) : scale(230),
      width: '100%',
    },
    iconCross: {
      paddingHorizontal: scale(10),
    },
    iconView: {
      position: Metrics.POSITION.ABSOLUTE,
      right: scale(5),
      top: scale(15),
    },
    inviteText: {
      textAlign: Metrics.ALIGN.CENTER,
      marginVertical: scale(15),
    },
    btnStyleFooter: {
      alignSelf: Metrics.ALIGN.CENTER,
      width: '50%',
    },
  });

  const renderContent = () => (
    <>
      <Text variant={Const.body1} style={styles.inviteText}>
        {Strings.EVENTS.INVITE_TEXT}
      </Text>
      <Button
        buttonTxt={Strings.EVENTS.INVITE_BTN}
        textVariant={Const.button1}
        buttonStyle={styles.btnStyleFooter}
        onPress={onPress}
      />
    </>
  );

  const renderSuccessContent = () => (
    <>
      <Text variant={Const.h5} style={styles.inviteText}>
        {Strings.EVENTS.INVITE_SUCCESS}
      </Text>
    </>
  );

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onCloseModal}>
      <View style={styles.container}>
        <View style={styles.content}>
          <ImageBackground
            source={status === 'success' ? Images.INVITE_S : Images.INVITE}
            style={styles.imageBackground}
            resizeMode={'contain'}
          />
          <View style={styles.iconView}>
            <Icon
              name={'cross'}
              type={'entypo'}
              size={iconSize.size30}
              color={Colors.COLOR_BLACK}
              style={styles.iconCross}
              onPress={onCloseModal}
            />
          </View>
          {status === 'success' ? renderSuccessContent() : renderContent()}
        </View>
      </View>
    </Modal>
  );
};

export default InvitationModal;
