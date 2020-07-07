import {
  profileActionTypes as actionTypes,
  ProfileInfo,
  SetProfileInfoAction,
  authActionTypes
} from "@purple-messenger/core";

export interface ProfileState {
  profileInfo?: ProfileInfo;
}

const initialState: ProfileState = {};

const authState = (
  state: ProfileState = initialState,
  action: SetProfileInfoAction
) => {
  switch (action.type) {
    case actionTypes.profile.reducer.setProfileInfo:
      return {
        ...state,
        profileInfo: action.profileInfo
      };
    case authActionTypes.auth.saga.signOut:
    case actionTypes.profile.reducer.resetProfileInfo: {
      const newState = { ...state };
      delete newState.profileInfo;
      return newState;
    }
    default:
      return state;
  }
};

export default authState;
