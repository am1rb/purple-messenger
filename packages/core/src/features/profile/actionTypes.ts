import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  profile: {
    reducer: {
      setProfileInfo: "" as "setProfileInfo",
      resetProfileInfo: "" as "resetProfileInfo",
    },
    saga: {},
  },
} as const);

export default actionTypes;
