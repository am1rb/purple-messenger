import React from "react";

export interface ConversationRowProps {
  selected: boolean;
}

function ConversationRow({ selected }: ConversationRowProps) {
  return (
    <div data-testid="mock-conversation-row">
      {selected && <span data-testid="mock-conversation-row-selected" />}
    </div>
  );
}

export default ConversationRow;
