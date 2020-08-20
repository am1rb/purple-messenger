import React from "react";

export interface ConversationRowProps {
  selected: boolean;
}

const conversationRow = jest.fn(({ selected }: ConversationRowProps) => (
  <div data-testid="conversation-row">
    {selected && <span data-testid="conversation-row-selected" />}
  </div>
));

export default conversationRow;
