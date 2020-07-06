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
});

export default actionTypes;
