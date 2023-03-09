import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationRoutes, Strings} from '../../../constants';
import {
  CustomAlertWithTwoActions,
  showToastAlert,
  showToastSuccess,
} from '../../../theme';
import * as actions from '../../../store/actions';

const DeleteAccountScreen = props => {
  const {userDetails, loginData} = useSelector(state => state.authReducer);
  let userInfo;
  if (userDetails !== null && Array.isArray(userDetails)) {
    userInfo = userDetails[0];
  } else {
    userInfo = userDetails;
  }
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      actions.deleteUserApiAction(userInfo.id, loginData?.access_token, res => {
        console.log('deleteUserApiAction', res);
        if (res.status === 200 || res.status === 204) {
          dispatch(actions.resetAuth());
          showToastSuccess('Account deleted successfully');
          props.navigation.reset({
            index: 0,
            routes: [
              {
                name: NavigationRoutes.WELCOME_SCREEN,
              },
            ],
          });
        } else {
          showToastAlert(res.data?.errors[0]?.message);
        }
      }),
    );
  };

  const openAlert = () => {
    props.navigation.goBack();
    CustomAlertWithTwoActions({
      title: 'Alert!',
      msg: Strings.delete_Account,
      actionText: 'Delete',
      onPress: () => handleDelete(),
      actionTextSecond: 'Cancel',
      onPressSecond: () => {},
    });
  };

  useEffect(() => {
    openAlert();
  }, []);
};
export default DeleteAccountScreen;
