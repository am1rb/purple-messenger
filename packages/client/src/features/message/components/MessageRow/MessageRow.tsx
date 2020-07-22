import React from "react";
import { Box, Card, Typography } from "@material-ui/core";
import { Message, MessageOwner } from "@purple-messenger/core";
import MessageStatus from "../MessageStatus";
import MessageSentAt from "../MessageSentAt";

export type Props = Message;

function MessageRow({ body, status, owner, sentAt }: Props) {
  return (
    <Box
      m={2}
      maxWidth="65%"
      marginLeft={owner === MessageOwner.Me ? "auto" : undefined}
      marginRight={owner === MessageOwner.Friend ? "auto" : undefined}
    >
      <Card>
        <Box m={1}>
          <Typography gutterBottom variant="body2">{body}</Typography>
          <Box display="flex" justifyContent="space-between">
            {owner === MessageOwner.Me ? <MessageStatus status={status} /> : <span />}
            <MessageSentAt sentAt={sentAt} />
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default MessageRow;
