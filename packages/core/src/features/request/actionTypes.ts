import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  request: {
    reducer: {
      setRequestList: "" as "setRequestList",
    },
    saga: {
      loadRequestList: "" as "loadRequestList",
      unloadRequestList: "" as "unloadRequestList",
      newRequest: "" as "newRequest",
      newRequestAck: "" as "newRequestAck",
      cancelRequest: "" as "cancelRequest",
      cancelRequestAck: "" as "cancelRequestAck",
      acceptRequest: "" as "acceptRequest",
      acceptRequestAck: "" as "acceptRequestAck",
      rejectRequest: "" as "rejectRequest",
      rejectRequestAck: "" as "rejectRequestAck",
    },
  },
} as const);

export default actionTypes;
