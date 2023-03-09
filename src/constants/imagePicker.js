import {Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {isLoading} from '../store/actions';
export default async function showImagePicker(from, dispatch) {
  dispatch(isLoading(true));
  let options = {
    compressImageQuality: 0.2,
    includeBase64: false,
    cropping: false,
    mediaType: 'photo',
  };
  let image = new Promise((resolve, reject) => {
    from === 'Upload'
      ? ImagePicker.openPicker(options)
          .then(response => {
            resolve(response);
            dispatch(isLoading(false));
          })
          .catch(error => {
            reject(error);
            if (
              error
                .toString()
                .startsWith('Error: User did not grant camera permission')
            ) {
              Alert.alert(
                'Camera Picker Err!',
                'User did not grant camera permission',
              );
            }
            dispatch(isLoading(false));
          })
      : ImagePicker.openCamera(options)
          .then(response => {
            resolve(response);
            dispatch(isLoading(false));
          })
          .catch(error => {
            reject(error);
            if (
              error
                .toString()
                .startsWith('Error: User did not grant camera permission')
            ) {
              Alert.alert(
                'Camera Picker Err!',
                'User did not grant camera permission',
              );
            }
            dispatch(isLoading(false));
          });
  });

  return image;
}
