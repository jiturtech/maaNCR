import {
  uploadPost,
  updateUserProfile,
  fetchPostsById,
  fetchPosts,
  markFavorite,
  fetchUsers,
  unMarkFavorite,
  updateInvitedUserStatus,
  sendInvite,
  InvitedUsers,
  deleteUser,
} from '../../services/api';
import {UPDATE_USER} from './actionType';
import {isLoading} from './extraActions';

export const uploadPostApiAction =
  (request, token, callback) =>
  (dispatch, _, {api}) => {
    dispatch(isLoading(true));
    uploadPost(api)(request)(token)
      .then(res => {
        dispatch(isLoading(false));
        callback(res);
      })
      .catch(err => {
        dispatch(isLoading(false));
        callback(err.response);
      });
  };

export const getTimelinePostsApiAction =
  (token, callback) =>
  (dispatch, _, {api}) => {
    fetchPosts(api)(token)
      .then(res => {
        callback(res);
      })
      .catch(err => {
        callback(err.response);
      });
  };

export const updateProfileAction = response => ({
  type: UPDATE_USER,
  data: response,
});
export const updateProfileApiAction =
  (request, userId, callback) =>
  (dispatch, _, {api}) => {
    dispatch(isLoading(true));
    updateUserProfile(api)(request)(userId)
      .then(res => {
        dispatch(updateProfileAction(res.data.data));
        dispatch(isLoading(false));
        callback(res);
      })
      .catch(err => {
        dispatch(isLoading(false));
        callback(err.response);
      });
  };

export const getPostsByIdApiAction =
  (request, callback) =>
  (dispatch, _, {api}) => {
    fetchPostsById(api)(request)
      .then(res => {
        callback(res);
      })
      .catch(err => {
        callback(err.response);
      });
  };

export const markFavApiAction =
  (request, token, callback) =>
  (dispatch, _, {api}) => {
    markFavorite(api)(request)(token)
      .then(res => {
        callback(res);
      })
      .catch(err => {
        callback(err.response);
      });
  };

export const getUsersApiAction =
  (request, callback) =>
  (dispatch, _, {api}) => {
    fetchUsers(api)(request)
      .then(res => {
        callback(res);
      })
      .catch(err => {
        callback(err.response);
      });
  };

export const markUnFavApiAction =
  (request, token, callback) =>
  (dispatch, _, {api}) => {
    unMarkFavorite(api)(request)(token)
      .then(res => {
        callback(res);
      })
      .catch(err => {
        callback(err.response);
      });
  };

export const updateInvitedUserStatusApiAction =
  (request, invite_Id, token, callback) =>
  (dispatch, _, {api}) => {
    dispatch(isLoading(true));
    updateInvitedUserStatus(api)(request)(invite_Id)(token)
      .then(res => {
        dispatch(isLoading(false));
        callback(res);
      })
      .catch(err => {
        dispatch(isLoading(false));
        callback(err.response);
      });
  };

export const sendInviteApiAction =
  (request, token, callback) =>
  (dispatch, _, {api}) => {
    dispatch(isLoading(true));
    sendInvite(api)(request)(token)
      .then(res => {
        dispatch(isLoading(false));
        callback(res);
      })
      .catch(err => {
        dispatch(isLoading(false));
        callback(err.response);
      });
  };

export const invitedUsersApiAction =
  (request, token, callback) =>
  (dispatch, _, {api}) => {
    dispatch(isLoading(true));
    InvitedUsers(api)(request)(token)
      .then(res => {
        dispatch(isLoading(false));
        callback(res);
      })
      .catch(err => {
        dispatch(isLoading(false));
        callback(err.response);
      });
  };

export const deleteUserApiAction =
  (userId, token, callback) =>
  (dispatch, _, {api}) => {
    dispatch(isLoading(true));
    deleteUser(api)(userId)(token)
      .then(res => {
        dispatch(isLoading(false));
        callback(res);
      })
      .catch(err => {
        dispatch(isLoading(false));
        callback(err.response);
      });
  };
