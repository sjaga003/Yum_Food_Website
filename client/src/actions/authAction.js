import { signIn, signUp } from '../api/databaseApi';
import { fetchToCookBook } from './cookBookAction';

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

export const authSignIn = (formData, history) => async (dispatch) => {
  try {
    //log in the user
    const { data } = await signIn(formData);

    dispatch({ type: 'auth/getAuthData', payload: data });

    history.push('/');
  } catch (error) {
    console.error(error);
  }
};
export const authSignUp = (formData, history) => async (dispatch) => {
  try {
    //sign up the user
    console.log('HERE');
    const { data } = await signUp(formData);
    dispatch({ type: 'auth/getAuthData', payload: data });
    history.push('/');
  } catch (error) {
    console.error(error);
  }
};