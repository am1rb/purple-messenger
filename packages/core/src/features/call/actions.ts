import { Phase } from "../../core/type";
import actionTypes from "./actionTypes";

export const startCall = (username: string, phase = Phase.Send) => ({
  type: actionTypes.call.saga.startCall,
  username,
  phase,
});
export type StartCallAction = ReturnType<typeof startCall>;

export const endCall = (username: string, phase = Phase.Send) => ({
  type: actionTypes.call.saga.endCall,
  username,
  phase,
});
export type EndCallAction = ReturnType<typeof endCall>;

export const acceptCall = (username: string, phase = Phase.Send) => ({
  type: actionTypes.call.saga.acceptCall,
  username,
  phase,
});
export type AcceptCallAction = ReturnType<typeof acceptCall>;

export const rejectCall = (username: string, phase = Phase.Send) => ({
  type: actionTypes.call.saga.rejectCall,
  username,
  phase,
});
export type RejectCallAction = ReturnType<typeof rejectCall>;
