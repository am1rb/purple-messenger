import React from "react";
import { render } from "@testing-library/react";
import { MessageStatus as Status } from "@purple-messenger/core";
import MessageStatus from "./MessageStatus";

describe("The <MessageStatus /> tests", () => {
  it("Should display schedule icon if the state is pending", () => {
    const { getByTestId } = render(<MessageStatus status={Status.Pending} />);
    expect(getByTestId("mock-mui-icons-schedule")).toBeInTheDocument();
  });

  it("Should display schedule icon if the state is sent", () => {
    const { getByTestId } = render(<MessageStatus status={Status.Sent} />);
    expect(getByTestId("mock-mui-icons-done")).toBeInTheDocument();
  });

  it("Should display schedule icon if the state is received", () => {
    const { getByTestId } = render(<MessageStatus status={Status.Received} />);
    expect(getByTestId("mock-mui-icons-done-all")).toBeInTheDocument();
  });

  it("Should display schedule icon if the state is seen", () => {
    const { getByTestId } = render(<MessageStatus status={Status.Seen} />);
    expect(getByTestId("mock-mui-icons-done-all")).toBeInTheDocument();
  });
});
