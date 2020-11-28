import React, { memo } from "react";
import { Box, Card, Typography } from "@material-ui/core";
import { Message, Owner } from "@purple-messenger/core";
import MessageStatus from "../MessageStatus";
import MessageSentAt from "../MessageSentAt";
import MessageSeenSensor from "../MessageSeenSensor";
import useStyles from "./MessageRow.styles";

export type MessageProps = Message;

function MessageRow({ body, status, owner, sentAt, id }: MessageProps) {
  const classes = useStyles();

  const message = (
    <Box
      m={2}
      maxWidth="65%"
      marginLeft={owner === Owner.Me ? "auto" : undefined}
      marginRight={owner === Owner.Friend ? "auto" : undefined}
    >
      <Card>
        <Box m={1}>
          <Typography gutterBottom variant="body2" className={classes.body}>
            {body}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            {owner === Owner.Me ? <MessageStatus status={status} /> : <span />}
            <MessageSentAt sentAt={sentAt} />
          </Box>
        </Box>
      </Card>
    </Box>
  );

  return owner === Owner.Friend ? (
    <MessageSeenSensor status={status} messageId={id}>
      {message}
    </MessageSeenSensor>
  ) : (
    message
  );
}

export default memo(MessageRow);
