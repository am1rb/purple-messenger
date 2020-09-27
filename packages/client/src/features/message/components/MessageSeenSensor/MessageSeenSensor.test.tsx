import React from "react";
import userEvent from "@testing-library/user-event";
import MessageSeenSensor, { MessageSeenSensorProps } from "./MessageSeenSensor";
import { MessageStatus, seenMessageAck } from "@purple-messenger/core";
import { renderWithStore } from "core/test";
import useConversationInfo from "features/conversation/components/useConversationInfo";

jest.mock("features/conversation/components/useConversationInfo");

const sharedUsername = "john";
const sharedProps: MessageSeenSensorProps = {
  children: <span />,
  messageId: 1,
  status: MessageStatus.Pending,
};

describe("The <MessageSeenSensor /> tests", () => {
  beforeEach(() =>
    (useConversationInfo as jest.Mock).mockReturnValue({
      username: sharedUsername,
    })
  );

  it("Should render VisibilitySensor if it is not seen", () => {
    const { getByTestId } = renderWithStore(
      <MessageSeenSensor {...sharedProps} status={MessageStatus.Received} />,
      {}
    );
    expect(getByTestId("mock-react-visibility-sensor")).toBeInTheDocument();
  });

  it("Should not render VisibilitySensor if it is seen", () => {
    const { queryByTestId } = renderWithStore(
      <MessageSeenSensor {...sharedProps} status={MessageStatus.Seen} />,
      {}
    );
    expect(
      queryByTestId("mock-react-visibility-sensor")
    ).not.toBeInTheDocument();
  });

  it("Should call seenMessageAck action if a message is seen", () => {
    const { getByTestId, store } = renderWithStore(
      <MessageSeenSensor {...sharedProps} status={MessageStatus.Received} />,
      {}
    );

    userEvent.click(getByTestId("mock-react-visibility-sensor-visible"));

    expect(store.actions).toContainEqual(
      seenMessageAck(sharedUsername, sharedProps.messageId)
    );
  });
});
