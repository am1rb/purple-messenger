import actionTypes from "./actionTypes";
import { ProfileInfo } from "./types";

export const setProfileInfo = (profileInfo: ProfileInfo) => ({
  type: actionTypes.profile.reducer.setProfileInfo,
  profileInfo
});
export type SetProfileInfoAction = ReturnType<typeof setProfileInfo>;

export const resetProfileInfo = () => ({ type: actionTypes.profile.reducer.resetProfileInfo });
export type ResetProfileInfoAction = ReturnType<typeof resetProfileInfo>;