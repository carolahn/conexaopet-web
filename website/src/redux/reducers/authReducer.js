const initialState = {
  token: null,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.access);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      console.log(JSON.stringify(action.payload.user))
      return { ...state, token: action.payload.access, user: action.payload.user, error: null };
    case 'LOGIN_FAILURE':
      return { ...state, token: null, user: null, error: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('formData');
      localStorage.removeItem('eventFormData');
      return { ...state, token: null, user: null, error: null };
    default:
      return state;
  }
};

export default authReducer;

