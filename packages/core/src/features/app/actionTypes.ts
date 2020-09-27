import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  app: {
    reducer: { },
    saga: {
      start: '',
      shutdown: '',
      redirectTo: '',
    },
  },
} as const);

export default actionTypes;
