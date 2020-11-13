import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  socket: {
    reducer: {
      connected: "" as "connected",
      disconnected: "" as "disconnected",
      setIsReady: "" as "setIsReady",
    },
    saga: { sendData: "" as "sendData" },
  },
} as const);

export default actionTypes;
