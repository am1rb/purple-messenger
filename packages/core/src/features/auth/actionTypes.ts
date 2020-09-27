import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  auth: {
    reducer: {
      setIsAuthenticated: '',
      setToken: '',
      resetToken: '',
      setAuthError: '',
    },
    saga: {
      signIn: '',
      signOut: '',
      verifyToken: '',
    },
  },
} as const);

export default actionTypes;
