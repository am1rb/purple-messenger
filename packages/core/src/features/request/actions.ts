import actionTypes from "./actionTypes";
import type { Request } from "./types";

export const setRequestList = (list: Request[]) => ({
  type: actionTypes.request.reducer.setRequestList,
  list,
});
export type SetRequestListAction = ReturnType<typeof setRequestList>;

export const loadRequestList = () => ({
  type: actionTypes.request.saga.loadRequestList,
});
export type LoadRequestListAction = ReturnType<typeof loadRequestList>;

export const unloadRequestList = () => ({
  type: actionTypes.request.saga.unloadRequestList,
});
export type UnloadRequestListAction = ReturnType<typeof unloadRequestList>;

export const newRequest = () => ({ type: actionTypes.request.saga.newRequest });
export type NewRequestAction = ReturnType<typeof newRequest>;

export const newRequestAck = () => ({
  type: actionTypes.request.saga.newRequestAck,
});
export type NewRequestAckAction = ReturnType<typeof newRequestAck>;

export const cancelRequest = () => ({
  type: actionTypes.request.saga.cancelRequest,
});
export type CancelRequestAction = ReturnType<typeof cancelRequest>;

export const cancelRequestAck = () => ({
  type: actionTypes.request.saga.cancelRequestAck,
});
export type CancelRequestAckAction = ReturnType<typeof cancelRequestAck>;

export const acceptRequest = () => ({
  type: actionTypes.request.saga.acceptRequest,
});
export type AcceptRequestAction = ReturnType<typeof acceptRequest>;

export const acceptRequestAck = () => ({
  type: actionTypes.request.saga.acceptRequestAck,
});
export type AcceptRequestAckAction = ReturnType<typeof acceptRequestAck>;

export const rejectRequest = () => ({
  type: actionTypes.request.saga.rejectRequest,
});
export type RejectRequestAction = ReturnType<typeof rejectRequest>;

export const rejectRequestAck = () => ({
  type: actionTypes.request.saga.rejectRequestAck,
});
export type RejectRequestAckAction = ReturnType<typeof rejectRequestAck>;
