import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  app: {
    reducer: { },
    saga: {
      start: '' as 'start',
      shutdown: '' as 'shutdown',
      redirectTo: '' as 'redirectTo',
    },
  },
} as const);

export default actionTypes;
