export const resetUserState = () => ({
  type: 'RESET_USER_STATE',
});

const initialState = {
  loading: false,
  error: null,
  protectorUsers: [],
  user: null,
  profileUser: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_USER_SUCCESS':
    case 'UPDATE_USER_SUCCESS':
    case 'GET_USER_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'CREATE_USER_FAILURE':
    case 'UPDATE_USER_FAILURE':
    case 'GET_USER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'FETCH_PROTECTOR_USERS_SUCCESS':
      return {
        ...state,
        protectorUsers: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_PROTECTOR_USERS_FAILURE':
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
    case 'FETCH_USER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null, 
      };
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        profileUser: action.payload,
        loading: false, 
        error: null,
      };
    case 'FETCH_USER_FAILURE':
      return {
        ...state,
        loading: false, 
        error: action.payload,
      };
    case 'RESET_USER_STATE':
      return initialState;
    default:
      return state;
  }
};
