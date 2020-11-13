import {
  profileActionTypes as actionTypes,
  ProfileInfo,
  SetProfileInfoAction,
  ResetProfileInfoAction,
  SingOutAction,
  authActionTypes,
} from "@purple-messenger/core";

export type ProfileState = ProfileInfo | null;

const initialState: ProfileState = null;

function profileReducer(
  state: ProfileState = initialState,
  action: SetProfileInfoAction | ResetProfileInfoAction | SingOutAction
): ProfileState {
  switch (action.type) {
    case actionTypes.profile.reducer.setProfileInfo:
      return { ...action.profileInfo };
    case actionTypes.profile.reducer.resetProfileInfo:
    case authActionTypes.auth.saga.signOut:
      return null;
    default:
      return state;
  }
}

export default profileReducer;
