import React from "react";
import { render } from "@testing-library/react";
import { AccountStatus } from "@purple-messenger/core";
import ConversationRow from ".";

jest.mock("features/message/components/MessageStatus");
jest.mock("features/message/components/MessageSentAt");
jest.mock("components/CardActionArea");

describe("The <ConversationRow /> tests", () => {
  it("Should match the snapshot", () => {
    const { container } = render(
      <ConversationRow
        selected
        id={1}
        isTyping
        friend={{
          id: 1,
          username: "user1",
          bio: "lumuiwuamielgiwonorrapkufpicagfevusevagivcistopkag",
          email: "jubsinbam@lej.uk",
          firstName: "Lydia",
          lastName: "Guzman",
          image: "",
          status: AccountStatus.Online,
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
