import actionTypes from "./actionTypes";

export const start = () => ({ type: actionTypes.app.saga.start });

export const shutdown = () => ({ type: actionTypes.app.saga.shutdown });

export const redirectTo = (url: string) => ({
  type: actionTypes.app.saga.redirectTo,
  url,
});
