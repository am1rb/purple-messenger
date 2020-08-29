import React from "react";
import { render } from "@testing-library/react";
import { MessageOwner, MessageStatus } from "@purple-messenger/core";
import MessageRow, { MessageProps } from "./MessageRow";

jest.mock("../MessageStatus");
jest.mock("../MessageSentAt");
jest.mock("../MessageSeenSensor");

const sharedProps: MessageProps = {
  id: 1,
  body: "1021 Vucwas Place",
  owner: MessageOwner.Friend,
  sentAt: new Date(),
  status: MessageStatus.Sent,
  receivedAt: new Date(),
};

describe("The <MessageRow /> tests", () => {
  it("Should match the snapshot", () => {
    const { container } = render(<MessageRow {...sharedProps} />);
    expect(container).toMatchSnapshot();
  });

  it("Should render <MessageStatus /> if the owner is me", () => {
    const { getByTestId } = render(
      <MessageRow {...sharedProps} owner={MessageOwner.Me} />
    );
    expect(getByTestId("mock-message-status")).toBeInTheDocument();
  });

  it("Should not render <MessageStatus /> if the owner is friend", () => {
    const { queryByTestId } = render(
      <MessageRow {...sharedProps} owner={MessageOwner.Friend} />
    );
    expect(queryByTestId("mock-message-status")).not.toBeInTheDocument();
  });

  it("Should not render <MessageSeenSensor /> if the owner is me", () => {
    const { queryByTestId } = render(
      <MessageRow {...sharedProps} owner={MessageOwner.Me} />
    );
    expect(queryByTestId("mock-message-seen-sensor")).not.toBeInTheDocument();
  });

  it("Should render <MessageSeenSensor /> if the owner is friend", () => {
    const { getByTestId } = render(
      <MessageRow {...sharedProps} owner={MessageOwner.Friend} />
    );
    expect(getByTestId("mock-message-seen-sensor")).toBeInTheDocument();
  });
});
