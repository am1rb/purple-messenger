import profile, { ProfileState } from "./profile";

export interface State {
  profile: ProfileState;
}

const reducers = { profile };

export default reducers;
