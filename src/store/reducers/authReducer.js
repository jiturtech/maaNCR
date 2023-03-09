import {
  IS_LOGGED_IN,
  REFRESH_TOKEN,
  RESET_AUTH,
  SIGN_IN,
  UPDATE_USER,
  USER_DETAILS,
} from '../actions/actionType';
const initialState = {
  userDetails: null,
  loggedIn: false,
  loginData: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        loginData: action.data,
      };
    case USER_DETAILS:
      return {
        ...state,
        userDetails: action.data,
      };
    case UPDATE_USER:
      return {
        ...state,
        userDetails: action.data,
      };
    case IS_LOGGED_IN: {
      return {
        ...state,
        loggedIn: action.data,
      };
    }
    case RESET_AUTH: {
      return {
        ...state,
        loggedIn: initialState.loggedIn,
        userDetails: initialState.userDetails,
        loginData: initialState.loginData,
      };
    }
    case REFRESH_TOKEN: {
      return {
        ...state,
        loginData: {
          ...state.loginData,
          access_token: action.data.access_token,
          refresh_token: action.data.refresh_token,
        },
      };
    }

    default:
      return state;
  }
};
export default authReducer;
