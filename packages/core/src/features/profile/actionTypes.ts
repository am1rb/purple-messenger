import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  profile: {
    reducer: {
      setProfileInfo: "",
      resetProfileInfo: "",
    },
    saga: {}
  }
});

export default actionTypes;
