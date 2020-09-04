import React from "react";

export interface SendMessageFormProps {
  disabled: boolean;
}

function SendMessageForm({ disabled }: SendMessageFormProps) {
  return <form data-testid="mock-send-message-form" data-disabled={disabled} />;
}

export default SendMessageForm;
