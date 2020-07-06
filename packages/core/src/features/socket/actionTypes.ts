import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  socket: {
    reducer: {
      connected: "",
      disconnected: "",
      setIsReady: ""
    },
    saga: { sendMessage: "" }
  }
});

export default actionTypes;
