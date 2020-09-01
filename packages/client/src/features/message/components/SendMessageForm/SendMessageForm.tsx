import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler } from "@rocketseat/unform";
import { Box, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import {
  startTypingMessage,
  stopTypingMessage,
  submitMessage,
} from "@purple-messenger/core";
import Unform from "components/Unform";
import MessageTextField from "../MessageTextField";
import useConversation from "features/conversation/components/useConversationInfo";
import { MessageFormContent } from "features/message/types/formContent";

export interface SendMessageFormProps {
  disabled: boolean;
}

function SendMessageForm({ disabled }: SendMessageFormProps) {
  const dispatch = useDispatch();
  const { username } = useConversation();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = useCallback<SubmitHandler<MessageFormContent>>(
    (data, helpers) => {
      if (username) {
        dispatch(submitMessage(username, data.message));
      }
      helpers.resetForm();
    },
    [dispatch, username]
  );

  const handleEnter = useCallback(() => buttonRef.current?.click(), []);

  const handleStartTyping = useCallback(() => {
    if (username) {
      dispatch(startTypingMessage(username));
    }
  }, [dispatch, username]);

  const handleStopTyping = useCallback(() => {
    if (username) {
      dispatch(stopTypingMessage(username));
    }
  }, [dispatch, username]);

  return (
    <Unform<MessageFormContent> onSubmit={handleSubmit}>
      <Box display="flex" alignItems="center">
        <Box flexShrink="0" flexGrow="1" mr={1}>
          <MessageTextField
            name="message"
            disabled={disabled}
            onEnter={handleEnter}
            onStartTyping={handleStartTyping}
            onStopTyping={handleStopTyping}
            autoFocus
          />
        </Box>
        <Box flexShrink="0" flexGrow="0">
          <IconButton type="submit" disabled={disabled} ref={buttonRef}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Unform>
  );
}

export default SendMessageForm;
