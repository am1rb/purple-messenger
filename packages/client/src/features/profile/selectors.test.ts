import { sampleProfileInfo } from "@purple-messenger/core";
import { State } from "core/redux/reducers";
import { InitialStore } from "core/test";
import { getProfileInfo, getProfileInfoImage } from "./selectors";

const shareStore: InitialStore = {
  profile: sampleProfileInfo,
};

describe("The profile selectors tests", () => {
  it("Should return the profile info correctly", () => {
    expect(getProfileInfo(shareStore as State)).toBe(sampleProfileInfo);
  });

  it("Should return the profile image correctly", () => {
    expect(getProfileInfoImage(shareStore as State)).toBe(
      sampleProfileInfo.image
    );
  });
});
