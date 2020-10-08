import {
  setProfileInfo,
  sampleProfileInfo,
  resetProfileInfo,
  signOut,
} from "@purple-messenger/core";
import reducer from "./profile";

jest.unmock("@purple-messenger/core");

describe("The profile reducer tests", () => {
  it("Should set profile info correctly", () => {
    expect(reducer(undefined, setProfileInfo(sampleProfileInfo))).toEqual(
      sampleProfileInfo
    );
  });

  it("Should reset profile info correctly", () => {
    const store = reducer(undefined, setProfileInfo(sampleProfileInfo));
    expect(reducer(store, resetProfileInfo())).toBe(null);
  });

  it("Should reset profile info after signOut action", () => {
    const store = reducer(undefined, setProfileInfo(sampleProfileInfo));
    expect(reducer(store, signOut())).toBe(null);
  });
});
