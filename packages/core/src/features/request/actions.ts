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

export const newRequest = (tempRequestId: number, username: string) => ({
  type: actionTypes.request.saga.newRequest,
  tempRequestId,
  username,
});
export type NewRequestAction = ReturnType<typeof newRequest>;

export const newRequestAck = (tempRequestId: number, requestId: number) => ({
  type: actionTypes.request.saga.newRequestAck,
  tempRequestId,
  requestId,
});
export type NewRequestAckAction = ReturnType<typeof newRequestAck>;

export const cancelRequest = (requestId: number) => ({
  type: actionTypes.request.saga.cancelRequest,
  requestId,
});
export type CancelRequestAction = ReturnType<typeof cancelRequest>;

export const cancelRequestAck = (requestId: number) => ({
  type: actionTypes.request.saga.cancelRequestAck,
  requestId,
});
export type CancelRequestAckAction = ReturnType<typeof cancelRequestAck>;

export const acceptRequest = (requestId: number) => ({
  type: actionTypes.request.saga.acceptRequest,
  requestId,
});
export type AcceptRequestAction = ReturnType<typeof acceptRequest>;

export const acceptRequestAck = (requestId: number) => ({
  type: actionTypes.request.saga.acceptRequestAck,
  requestId,
});
export type AcceptRequestAckAction = ReturnType<typeof acceptRequestAck>;

export const rejectRequest = (requestId: number) => ({
  type: actionTypes.request.saga.rejectRequest,
  requestId,
});
export type RejectRequestAction = ReturnType<typeof rejectRequest>;

export const rejectRequestAck = (requestId: number) => ({
  type: actionTypes.request.saga.rejectRequestAck,
  requestId,
});
export type RejectRequestAckAction = ReturnType<typeof rejectRequestAck>;
