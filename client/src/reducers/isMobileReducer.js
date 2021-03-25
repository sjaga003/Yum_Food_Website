const initialState = false;

const isMobileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'isMobile/setIsMobile':
      return action.payload;
    default:
      return state;
  }
};

export default isMobileReducer;
