import React from "react";
import { render } from "@testing-library/react";
import { MessageStatus as Status } from "@purple-messenger/core";
import MessageStatus from "./MessageStatus";

describe("The <MessageStatus /> tests", () => {
  it("Should display schedule icon if the state is pending", () => {
    const { getByTestId } = render(<MessageStatus status={Status.Pending} />);
    expect(getByTestId("mui-icons-schedule")).toBeInTheDocument();
  });

  it("Should display schedule icon if the state is sent", () => {
    const { getByTestId } = render(<MessageStatus status={Status.Sent} />);
    expect(getByTestId("mui-icons-done")).toBeInTheDocument();
  });
});
