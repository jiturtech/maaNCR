import * as React from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Const, Strings} from '../constants';
import {iconSize} from '../constants/Const';
import {Colors, CommonStyle, Metrics, scale} from '../theme';
import Divider from './Divider';
import Text from './Text';

const ItemPicker = ({
  visible,
  onRequestClose,
  hdrTitle,
  onPress,
  data,
  extraData,
  type = 'list',
}) => {
  const styles = StyleSheet.create({
    opacityView: {
      flex: 1,
      justifyContent: Metrics.ALIGN.FLEX_END,
      backgroundColor: Colors.COLOR_OPACITY,
    },

    contentView: {
      ...CommonStyle.shadowStyle,
      height: type === 'imagePicker' ? '16%' : '40%',
      width: '100%',
      backgroundColor: Colors.COLOR_WHITE,
      borderTopRightRadius: scale(30),
      borderTopLeftRadius: scale(30),
    },
    hdrTitle: {
      padding: 20,
      textDecorationLine: 'underline',
      width: '80%',
    },
    doneBtnStyle: {
      position: 'absolute',
      right: scale(15),
      top: scale(20),
      color: Colors.COLOR_THEME,
    },
    valueStyle: {
      marginLeft: type === 'imagePicker' ? 0 : scale(10),
      color: Colors.COLOR_BLACK,
      width: '73%',
      alignSelf: 'center',
    },
    iconStyle: {
      padding: scale(10),
      marginLeft: type === 'imagePicker' ? 0 : scale(10),
      color: Colors.COLOR_BLACK,
    },
    underLineStyle: {
      height: '1.5%',
      backgroundColor: Colors.COLOR_DARK_GREY,
      width: '20%',
      alignSelf: Metrics.ALIGN.CENTER,
      borderRadius: scale(8),
    },
    touchStyle: {
      marginVertical: 10,
      flexDirection: Metrics.FLEX_DIRECTION.ROW,
      justifyContent:
        type === 'imagePicker'
          ? Metrics.ALIGN.CENTER
          : Metrics.ALIGN.FLEX_START,
    },
    tickIcon: {
      position: 'absolute',
      right: 30,
      bottom: 12,
    },
    valueStyleTwo: {
      color: Colors.COLOR_BLACK,
      marginVertical: 10,
      alignSelf: 'center',
    },
  });

  const renderListing = () => (
    <FlatList
      data={data}
      extraData={extraData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );

  const renderItem = ({item, index}) => (
    <>
      <TouchableOpacity
        style={styles.touchStyle}
        onPress={() => onPress(item, index)}>
        {type !== 'imagePicker' && (
          <Icon
            name={item.iconName}
            type={item.iconType}
            size={iconSize.size20}
            color={Colors.COLOR_BLACK}
            style={styles.iconStyle}
          />
        )}
        <Text
          variant={Const.h3}
          style={
            type !== 'imagePicker' ? styles.valueStyle : styles.valueStyleTwo
          }>
          {item.value}
        </Text>
        {item.selected && (
          <View style={styles.tickIcon}>
            <Icon
              name={'check'}
              type={'entypo'}
              size={iconSize.size20}
              color={Colors.COLOR_THEME}
            />
          </View>
        )}
      </TouchableOpacity>
      {data && data.length - 1 !== index && <Divider inset={20} />}
    </>
  );
  return type === 'imagePicker' ? (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <TouchableOpacity
        onPress={onRequestClose}
        activeOpacity={1}
        style={styles.opacityView}>
        <View style={styles.contentView}>{renderListing()}</View>
      </TouchableOpacity>
    </Modal>
  ) : (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View
        onPress={onRequestClose}
        activeOpacity={1}
        style={styles.opacityView}>
        <View style={styles.contentView}>
          <TouchableOpacity onPress={onRequestClose}>
            <Text
              onPress={onRequestClose}
              variant={Const.h5}
              style={styles.doneBtnStyle}>
              {Strings.DONE}
            </Text>
          </TouchableOpacity>
          <View style={styles.underLineStyle} />
          <Text variant={Const.h5} style={styles.hdrTitle}>
            {hdrTitle}
          </Text>
          {renderListing()}
        </View>
      </View>
    </Modal>
  );
};

export default ItemPicker;
