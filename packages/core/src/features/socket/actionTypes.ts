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
});

export default actionTypes;
