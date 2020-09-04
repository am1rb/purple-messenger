import React from "react";

export interface ConversationMessageBodyProps {
  children: React.ReactNode;
}

function ConversationMessageBody({ children }: ConversationMessageBodyProps) {
  return <span data-testid="mock-conversation-message-body">{children}</span>;
}

export default ConversationMessageBody;
