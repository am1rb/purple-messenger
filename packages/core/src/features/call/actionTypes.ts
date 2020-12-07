import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  call: {
    reducer: {},
    saga: {
      startCall: "" as "startCall",
      endCall: "" as "startCall",
      answerCall: "" as "answerCall",
      rejectCall: "" as "rejectCall",
      incomingCall: "" as "incomingCall",
    },
  },
} as const);

export default actionTypes;
