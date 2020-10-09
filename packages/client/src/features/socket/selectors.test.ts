import { State } from "core/redux/reducers";
import { InitialStore } from "core/test";
import { getIsConnected, getIsReady } from "./selectors";

describe("The socket selectors tests", () => {
  it("Should return the ready status correctly", () => {
    [true, false].map((status) => {
      const store: InitialStore = {
        socket: {
          isReady: status,
          isConnected: false,
        },
      };
      expect(getIsReady(store as State)).toBe(status);
    });
  });

  it("Should return the connected status correctly", () => {
    [true, false].map((status) => {
      const store: InitialStore = {
        socket: {
          isReady: false,
          isConnected: status,
        },
      };
      expect(getIsConnected(store as State)).toBe(status);
    });
  });
});
