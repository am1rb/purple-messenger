import React from "react";

interface ConversationListProps {
  selectedUsername: string | undefined;
}

function ConversationList({ selectedUsername }: ConversationListProps) {
  return (
    <div
      data-testid="mock-conversation-list"
      data-username={selectedUsername}
    />
  );
}

export default ConversationList;
