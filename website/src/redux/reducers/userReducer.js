const initialState = {
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_USER_SUCCESS':
    case 'UPDATE_USER_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'CREATE_USER_FAILURE':
    case 'UPDATE_USER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'CLEAR_USER_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
