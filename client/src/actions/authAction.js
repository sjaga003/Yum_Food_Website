export const getAuthData = (result, token) => {
  return {
    type: 'auth/getAuthData',
    payload: { result, token },
  };
};

export const logoutUser = () => {
  return {
    type: 'auth/logoutUser',
  };
};
