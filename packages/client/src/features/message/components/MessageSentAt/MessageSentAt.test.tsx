import React from "react";
import { render } from "@testing-library/react";
import MessageSentAt from "./MessageSentAt";

describe("The <MessageSentAt /> tests", () => {
  let dateSpy: jest.SpyInstance;

  beforeEach(() => {
    dateSpy = jest
      .spyOn(global.Date, "now")
      .mockImplementation(() => Date.parse("2020-02-14"));
  });
  afterEach(() => dateSpy.mockRestore());

  it("Should match the snapshot", () => {
    const { container } = render(
      <MessageSentAt sentAt={new Date("2020-02-13")} />
    );
    expect(container).toMatchSnapshot();
  });
});
