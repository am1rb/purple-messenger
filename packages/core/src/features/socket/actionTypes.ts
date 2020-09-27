import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  socket: {
    reducer: {
      connected: "",
      disconnected: "",
      setIsReady: ""
    },
    saga: { sendData: "" }
  }
} as const);

export default actionTypes;
