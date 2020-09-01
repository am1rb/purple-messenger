import React from "react";
import { render } from "@testing-library/react";
import MessageZone, { MessageZoneProps } from "./MessageZone";

jest.mock("../SendMessageForm");
jest.mock("../MessageList");

const sharedProps: MessageZoneProps = {
  username: "john",
};

describe("The <MessageZone /> tests", () => {
  it("Should match the snapshot", () => {
    const { container } = render(<MessageZone {...sharedProps} />);
    expect(container).toMatchSnapshot();
  });

  it("Should disable the send message form prop the send form if there is no username", () => {
    const { getByTestId } = render(<MessageZone username={undefined} />);
    expect(getByTestId("mock-send-message-form").dataset).toMatchObject({
      disabled: "true",
    });
  });

  it("Should not disable the send message form if there is no username", () => {
    const { getByTestId } = render(<MessageZone {...sharedProps} />);
    expect(getByTestId("mock-send-message-form").dataset).toMatchObject({
      disabled: "false",
    });
  });
});
