import React from "react";

export interface SendMessageFormProps {
  disabled: boolean;
}

const sendMessageForm = jest.fn(({ disabled }: SendMessageFormProps) => (
  <form data-testid="mock-send-message-form" data-disabled={disabled} />
));

export default sendMessageForm;
