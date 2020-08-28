import React, { useCallback } from "react";
import { Box } from "@material-ui/core";
import SendMessageForm from "../SendMessageForm";
import MessageList, { MessageListProps } from "../MessageList";

interface MessageZoneProps extends MessageListProps {
  className: string;
}

function MessageZone({ className, username }: MessageZoneProps) {
  return (
    <Box className={className} display="flex" flexDirection="column">
      <Box flexGrow="1" flexShrink="1" overflow="hidden">
        <MessageList username={username} />
      </Box>
      <Box flexGrow="0" flexShrink="0" m={1}>
        <SendMessageForm key={username} disabled={!username} />
      </Box>
    </Box>
  );
}

export default MessageZone;
