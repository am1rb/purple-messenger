import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  auth: {
    reducer: {
      setIsAuthenticated: '' as 'setIsAuthenticated',
      setToken: '' as 'setToken',
      resetToken: '' as 'resetToken',
      setAuthError: '' as 'setAuthError',
    },
    saga: {
      signIn: '' as 'signIn',
      signOut: '' as 'signOut',
      verifyToken: '' as 'verifyToken',
    },
  },
} as const);

export default actionTypes;
