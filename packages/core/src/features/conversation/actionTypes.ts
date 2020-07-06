import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  conversation: {
    reducer: { },
    saga: { },
  },
});

export default actionTypes;
