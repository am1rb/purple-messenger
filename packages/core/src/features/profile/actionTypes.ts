import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  profile: {
    reducer: {
      setProfileInfo: "",
      resetProfileInfo: "",
    },
    saga: {}
  }
} as const);

export default actionTypes;
