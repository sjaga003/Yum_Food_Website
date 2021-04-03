import { signIn, signUp } from '../api/databaseApi';

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

export const authSignIn = (
  formData,
  history,
  setIncorrectCredentials,
  setAccessingDatabase
) => async (dispatch) => {
  try {
    //log in the user
    setAccessingDatabase(true);
    const { data } = await signIn(formData);
    setIncorrectCredentials(false);
    dispatch({ type: 'auth/getAuthData', payload: data });
    setAccessingDatabase(false);
    history.push('/');
  } catch (error) {
    setAccessingDatabase(false);
    setIncorrectCredentials(true);
    console.error(error);
  }
};
export const authSignUp = (formData, history) => async (dispatch) => {
  try {
    //sign up the user
    const { data } = await signUp(formData);
    dispatch({ type: 'auth/getAuthData', payload: data });
    history.push('/');
  } catch (error) {
    console.error(error);
  }
};

export const setAuthData = () => {
  return {
    type: 'auth/setAuthData',
  };
};
