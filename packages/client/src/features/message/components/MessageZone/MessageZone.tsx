import React from "react";
import { Box } from "@material-ui/core";
import SendMessageForm from "../SendMessageForm";
import MessageList, { MessageListProps } from "../MessageList";
import MessageHeader from "../MessageHeader";

export interface MessageZoneProps extends MessageListProps {
  className?: string;
}

function MessageZone({ className, username }: MessageZoneProps) {
  return (
    <Box className={className} display="flex" flexDirection="column">
      <Box
        display="flex"
        flexDirection="column"
        flexGrow="1"
        flexShrink="1"
        overflow="hidden"
      >
        <MessageHeader disabled={!username} />
        <Box flexGrow="1" flexShrink="1" overflow="hidden">
          <MessageList username={username} />
        </Box>
      </Box>
      <Box flexGrow="0" flexShrink="0" m={1}>
        <SendMessageForm
          key={username}
          disabled={!username}
          username={username}
        />
      </Box>
    </Box>
  );
}

export default MessageZone;
