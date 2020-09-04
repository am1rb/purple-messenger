import React from "react";

export interface ConversationMessageBodyProps {
  children: React.ReactNode;
}

function ConversationMessageBody({ children }: ConversationMessageBodyProps) {
  return <>{children}</>;
}

export default ConversationMessageBody;
