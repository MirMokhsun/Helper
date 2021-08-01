const initialState = {
  password: { isValid: false, value: null },
  email: { isValid: false, value: null },
};

export default function authorizationData(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case 'IS_VALID_PASSWORD_AUTHORIZATION':
      return {
        ...state,
        password: data,
      };
    case 'IS_VALID_EMAIL_AUTHORIZATION':
      return {
        ...state,
        email: data,
      };
    default:
      return state;
  }
}