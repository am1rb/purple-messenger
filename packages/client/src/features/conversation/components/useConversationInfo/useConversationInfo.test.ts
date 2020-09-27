import { renderHook } from "core/test";
import { useParams } from "react-router";
import useConversationInfo from "./useConversationInfo";

describe("The useConversationInfo tests", () => {
  it("Should return the username correctly", () => {
    const output = { username: "john" };
    (useParams as jest.Mock).mockReturnValue(output);
    const { result } = renderHook(() => useConversationInfo());
    expect(result.current).toEqual(output);
  });
});
