import { Action } from "redux";
import actionTypes from "./actionTypes";

export const connected = () => ({
  type: actionTypes.socket.reducer.connected
});

export const disconnected = () => ({
  type: actionTypes.socket.reducer.disconnected
});

export const sendData = (data: Action) => ({
  type: actionTypes.socket.saga.sendData,
  data
});
export type SendDataAction = ReturnType<typeof sendData>;

export const setIsReady = (status: boolean) => ({
  type: actionTypes.socket.reducer.setIsReady,
  status
});
export type SetIsReadyAction = ReturnType<typeof setIsReady>;
