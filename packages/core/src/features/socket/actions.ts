import { Action } from "redux";
import actionTypes from "./actionTypes";

export const connected = () => ({
  type: actionTypes.socket.reducer.connected
});

export const disconnected = () => ({
  type: actionTypes.socket.reducer.disconnected
});

export const sendMessage = (message: Action) => ({
  type: actionTypes.socket.saga.sendMessage,
  message
});
export type SendMessageAction = ReturnType<typeof sendMessage>;

export const setIsReady = (status: boolean) => ({
  type: actionTypes.socket.reducer.setIsReady,
  status
});
export type SetIsReadyAction = ReturnType<typeof setIsReady>;
