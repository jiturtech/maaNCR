//AUTHENTICATION
export const signUp = api => request =>
  api({
    url: 'users',
    method: 'post',
    data: request,
  });

export const uploadFile = api => request =>
  api({
    url: 'files',
    method: 'post',
    data: request,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const signIn = api => request =>
  api({
    url: 'auth/login',
    method: 'post',
    data: request,
  });

export const getUserProfileDetails = api => request => token =>
  api({
    url: `users?filter[email][_eq]=${request}`,
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

export const refreshTokenAPI = api => request =>
  api({
    url: 'auth/refresh',
    method: 'post',
    data: request,
  });

export const sendEmailApi = api => request =>
  api({
    url: 'custom/sendmail',
    method: 'post',
    data: request,
  });

export const forgetApi = api => request =>
  api({
    url: 'auth/password/request',
    method: 'post',
    data: request,
  });

//DASHBOARD
export const uploadPost = api => request => token =>
  api({
    url: 'items/post',
    method: 'post',
    data: request,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

export const fetchPosts = api => token =>
  api({
    url: 'custom/allpost/-1/1/timeline',
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

export const fetchPostsById = api => request =>
  api({
    url: `items/post?filter[type][_eq]=${request.type}&filter[user_created][_eq]=${request.userId}&fields=*,user_created.*`,
    method: 'get',
  });

export const updateUserProfile = api => request => userId =>
  api({
    url: `users/${userId}`,
    method: 'patch',
    data: request,
  });

export const markFavorite = api => request => token =>
  api({
    url: 'items/post_likes',
    method: 'post',
    data: request,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

export const unMarkFavorite = api => request => token =>
  api({
    url: `custom/likes/${request.postId}/user/${request.userId}`,
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

export const fetchUsers = api => token =>
  api({
    url: 'users',
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

export const checkCodeExist = api => request => token =>
  api({
    url: `users?filter[referalsid][_eq]=${request}`,
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

export const sendInvite = api => request => token =>
  api({
    url: `items/Invites`,
    method: 'post',
    data: request,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

export const changeUserStatus = api => request => user_Id => token =>
  api({
    url: `users/${user_Id}`,
    method: 'patch',
    data: request,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

export const updateInvitedUserStatus = api => request => invite_Id => token =>
  api({
    url: `items/Invites/${invite_Id}`,
    method: 'patch',
    data: request,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

export const InvitedUsers = api => request => token =>
  api({
    url: `items/Invites?filter[invite_code][_eq]=${request}&filter[status][_eq]=sent&fields=*,user_created.*`,
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

export const deleteUser = api => userId => token =>
  api({
    url: `/users/${userId}`,
    method: 'delete',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
