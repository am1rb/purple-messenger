import iff from "./iff";

describe("iff Function Tests", () => {
  it("should return the first argument if the condition is true", () => {
    expect(iff(true, "yes", "no")).toBe("yes");
  });

  it("should return the second argument if the condition is false", () => {
    expect(iff(false, "yes", "no")).toBe("no");
  });
});
