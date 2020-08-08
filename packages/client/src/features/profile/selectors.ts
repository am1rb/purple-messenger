import { State } from "./reducers";

export const getProfileInfo = (state: State) => state.profile.profileInfo;

export const getProfileInfoImage = (state: State) =>
  getProfileInfo(state)?.image;
