import React from "react";

interface ConversationListProps {
  selectedUsername: string | undefined;
}

const conversationList = jest.fn(
  ({ selectedUsername }: ConversationListProps) => (
    <div data-testid="conversation-list" data-username={selectedUsername} />
  )
);

export default conversationList;
