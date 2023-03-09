import {Alert} from 'react-native';

export function CustomAlert({title, msg}) {
  Alert.alert(title, msg);
}
export function CustomAlertWithAction({
  title,
  msg,
  onPress,
  actionText,
  style,
}) {
  Alert.alert(title, msg, [
    {
      text: actionText,
      onPress: onPress,
      style: style,
    },
  ]);
}
export function CustomAlertWithTwoActions({
  title,
  msg,
  onPress,
  onPressSecond,
  actionText,
  actionTextSecond,
  style,
  styleSecond,
}) {
  Alert.alert(title, msg, [
    {
      text: actionText,
      onPress: onPress,
      style: style,
    },
    {
      text: actionTextSecond,
      onPress: onPressSecond,
      style: styleSecond,
    },
  ]);
}

export function CustomAlertWithThreeActions({
  title,
  msg,
  onPress,
  onPressSecond,
  onPressThird,
  actionText,
  actionTextSecond,
  actionTextThird,
  style,
  styleSecond,
  styleThird,
}) {
  Alert.alert(title, msg, [
    {
      text: actionText,
      onPress: onPress,
      style: style,
    },
    {
      text: actionTextSecond,
      onPress: onPressSecond,
      style: styleSecond,
    },
    {
      text: actionTextThird,
      onPress: onPressThird,
      style: styleThird,
    },
  ]);
}
