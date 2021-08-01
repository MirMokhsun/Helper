
const initialState = {
  email: { isValid: false, value: null },
};

export default function forgotPasswordData(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case 'IS_VALID_EMAIL_FORGOT_PASSWORD':
      return {
        ...state,
        email: data,
      };
    default:
      return state;
  }
}