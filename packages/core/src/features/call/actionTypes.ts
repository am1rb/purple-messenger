import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  call: {
    reducer: {},
    saga: {
      startCall: "" as "startCall",
      endCall: "" as "startCall",
      acceptCall: "" as "acceptCall",
      rejectCall: "" as "rejectCall",
    },
  },
} as const);

export default actionTypes;
