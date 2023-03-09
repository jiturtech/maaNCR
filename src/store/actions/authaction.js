import {
  changeUserStatus,
  checkCodeExist,
  forgetApi,
  getUserProfileDetails,
  refreshTokenAPI,
  sendEmailApi,
  signIn,
  signUp,
  uploadFile,
} from '../../services/api';
import {
  IS_LOGGED_IN,
  REFRESH_TOKEN,
  RESET_AUTH,
  SIGN_IN,
  USER_DETAILS,
} from './actionType';
import {isLoading} from './extraActions';

export const isLoggedIn = trueFalse => ({
  type: IS_LOGGED_IN,
  data: trueFalse,
});
export const resetAuth = () => ({
  type: RESET_AUTH,
});
export const signUpApiAction =
  (request, callback) =>
  (dispatch, _, {api}) => {
    dispatch(isLoading(true));
    signUp(api)(request)
      .then(res => {
        dispatch(isLoading(false));
        callback(res);
      })
      .catch(err => {
        dispatch(isLoading(false));
        callback(err.response);
      });
  };

export const uploadFileApiAction =
  (request, callback) =>
  (dispatch, _, {api}) => {
    dispatch(isLoading(true));
    uploadFile(api)(request)
      .then(res => {
        dispatch(isLoading(false));
        callback(res);
      })
      .catch(err => {
        dispatch(isLoading(false));
        callback(err.response);
      });
  };

export const signInAction = response => ({
  type: SIGN_IN,
  data: response,
});

export const signInApiAction =
  (request, callback) =>
  (dispatch, _, {api}) => {
    dispatch(isLoading(true));
    signIn(api)(request)
      .then(res => {
        dispatch(isLoading(false));
        dispatch(signInAction(res.data.data));
        callback(res);
      })
      .catch(err => {
        dispatch(isLoading(false));
        callback(err.response);
      });
  };

export const userDetailsAction = response => ({
  type: USER_DETAILS,
  data: response,
});

export const userDetailsApiAction =
  (request, token, callback) =>
  (dispatch, _, {api}) => {
    dispatch(isLoading(true));
    getUserProfileDetails(api)(request)(token)
      .then(res => {
        if (res.status === 200) {
          dispatch(userDetailsAction(res.data.data));
        }
        dispatch(isLoading(false));
        callback(res);
      })
      .catch(err => {
        dispatch(isLoading(false));
        callback(err.response);
      });
  };

export const refreshTokenAction = response => ({
  type: REFRESH_TOKEN,
  data: response,
});
export const onRefreshToken =
  (request, callback) =>
  (dispatch, _, {api}) => {
    dispatch(isLoading(true));
    refreshTokenAPI(api)(request)
      .then(res => {
        if (res.status === 200) {
          dispatch(refreshTokenAction(res.data.data));
        }
        dispatch(isLoading(false));
        callback(res);
      })
      .catch(err => {
        dispatch(isLoading(false));
        callback(err.response);
      });
  };

export const sendEmailApiAction =
  (request, callback) =>
  (dispatch, _, {api}) => {
    dispatch(isLoading(true));
    sendEmailApi(api)(request)
      .then(res => {
        dispatch(isLoading(false));
        callback(res);
      })
      .catch(err => {
        dispatch(isLoading(false));
        callback(err.response);
      });
  };

export const forgetPasswordApiAction =
  (request, callback) =>
  (dispatch, _, {api}) => {
    dispatch(isLoading(true));
    forgetApi(api)(request)
      .then(res => {
        dispatch(isLoading(false));
        callback(res);
      })
      .catch(err => {
        dispatch(isLoading(false));
        callback(err.response);
      });
  };

export const checkCodeExistApiAction =
  (request, token, callback) =>
  (dispatch, _, {api}) => {
    checkCodeExist(api)(request)(token)
      .then(res => {
        callback(res);
      })
      .catch(err => {
        callback(err.response);
      });
  };

export const changeUserStatusApiAction =
  (request, user_Id, token, callback) =>
  (dispatch, _, {api}) => {
    dispatch(isLoading(true));
    changeUserStatus(api)(request)(user_Id)(token)
      .then(res => {
        dispatch(isLoading(false));
        callback(res);
      })
      .catch(err => {
        dispatch(isLoading(false));
        callback(err.response);
      });
  };
