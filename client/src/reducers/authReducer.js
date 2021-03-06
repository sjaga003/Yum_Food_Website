const initialState = { authData: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'auth/getAuthData':
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
      return { ...state, authData: action.payload };
    case 'auth/logoutUser':
      localStorage.clear();
      return { ...state, authData: null };
    case 'auth/setAuthData':
      return { ...state, authData: localStorage.getItem('profile') };
    default:
      return state;
  }
};

export default authReducer;
