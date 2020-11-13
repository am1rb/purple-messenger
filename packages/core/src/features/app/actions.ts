import actionTypes from "./actionTypes";

export const start = () => ({ type: actionTypes.app.saga.start });
export type StartAction = ReturnType<typeof start>;

export const shutdown = () => ({ type: actionTypes.app.saga.shutdown });
export type ShutdownAction = ReturnType<typeof shutdown>;

export const redirectTo = (url: string) => ({
  type: actionTypes.app.saga.redirectTo,
  url,
});
export type RedirectToAction = ReturnType<typeof redirectTo>;
