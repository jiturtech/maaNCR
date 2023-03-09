import {Platform} from 'react-native';
import Snackbar from 'react-native-snackbar';
import COLORS from './Colors';
import Toast from 'react-native-simple-toast';

export function MYTOAST(title) {
  Toast.show(title, Toast.LONG);
}

export function showToast(title) {
  Snackbar.show({
    text: title,
    textColor: COLORS.COLOR_WHITE,
    backgroundColor: COLORS.COLOR_THEME,
    duration: 2000,
    action: {
      textColor: COLORS.COLOR_WHITE,
      onPress: () => {
        /* Do something. */
      },
    },
  });
}

// ----------------------------------------

export function showToastSuccess(title) {
  if (Platform.OS === 'ios') {
    Snackbar.show({
      text: title,
      textColor: COLORS.COLOR_WHITE,
      backgroundColor: COLORS.COLOR_GREEN,
      duration: 5000,
      action: {
        textColor: COLORS.COLOR_WHITE,
        onPress: () => {
          /* Do something. */
        },
      },
    });
  } else {
    Toast.show(title, 3000);
  }
}

// ----------------------------------------

export function showToastAlert(title, color) {
  if (Platform.OS === 'ios') {
    Snackbar.show({
      text: title,
      textColor: COLORS.COLOR_WHITE,
      backgroundColor: color ? color : COLORS.COLOR_THEME,
      duration: 5000,
      action: {
        textColor: COLORS.failure_Toast,
        onPress: () => {
          /* Do something. */
        },
      },
    });
  } else {
    Toast.show(title, 3000);
  }
}

export function showLongToastAlert(title, color) {
  if (Platform.OS === 'ios') {
    Snackbar.show({
      text: title,
      backgroundColor: color ? color : COLORS.COLOR_THEME,
      duration: 6000,
      action: {
        textColor: COLORS.failure_Toast,
        onPress: () => {
          /* Do something. */
        },
      },
    });
  } else {
    Toast.show(title, 6000);
  }
}
