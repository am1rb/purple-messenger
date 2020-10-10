import { connected, disconnected, setIsReady } from "@purple-messenger/core";
import reducer from "./socket";

describe("The socket reducer tests", () => {
  it("Should set isConnected to true correctly", () => {
    expect(reducer(undefined, connected()).isConnected).toBeTruthy();
  });

  it("Should set isConnected to false correctly", () => {
    expect(reducer(undefined, disconnected()).isConnected).toBeFalsy();
  });

  it("Should set isReadyStatus correctly", () => {
    [true, false].map((status) => {
      expect(reducer(undefined, setIsReady(status)).isReady).toBe(status);
    });
  });
});
