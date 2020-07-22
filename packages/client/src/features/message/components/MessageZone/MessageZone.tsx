import React, { useCallback } from "react";
import { Box } from "@material-ui/core";
import SendMessageForm from "../SendMessageForm";
import MessageList from "../MessageList";

interface Props {
  className: string;
  friendUsername: string | undefined;
}

function MessageZone({ className, friendUsername }: Props) {
  return (
    <Box className={className} display="flex" flexDirection="column">
      <Box flexGrow="1" flexShrink="1" overflow="hidden">
        <MessageList />
      </Box>
      <Box flexGrow="0" flexShrink="0" m={1}>
        <SendMessageForm
          key={friendUsername}
          disabled={!friendUsername}
        />
      </Box>
    </Box>
  );
}

export default MessageZone;
