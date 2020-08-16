import React, { memo } from "react";
import clsx from "clsx";
import { Conversation, MessageOwner } from "@purple-messenger/core";
import { Card, CardContent, Box, Avatar, Typography } from "@material-ui/core";
import MessageStatus from "features/message/components/MessageStatus";
import MessageSentAt from "features/message/components/MessageSentAt";
import CardActionArea from "components/CardActionArea";
import iff from "core/helper/iff";
import MessageIsTyping from "features/message/components/MessageIsTyping";
import ConversationNoMessage from "../ConversationNoMessage";
import useStyles from "./ConversationRow.styles";

export interface ConversationRowProps extends Conversation {
  selected: boolean;
}

function ConversationRow({
  message,
  friend,
  selected,
  isTyping,
}: ConversationRowProps) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, iff(selected, classes.selected))}>
      <CardActionArea to={"/conversation/@" + friend.username} disableRipple>
        <CardContent>
          <Box display="flex" alignItems="center" width="100%">
            <Avatar src={friend.image} />
            <Box ml={1} overflow="hidden" width="100%">
              <Box>
                <Typography noWrap>
                  {friend.firstName} {friend.lastName}
                </Typography>
                <Typography
                  variant="subtitle2"
                  noWrap
                  color="textSecondary"
                  gutterBottom
                >
                  {message?.owner === MessageOwner.Me && "You: "}
                  {isTyping ? (
                    <MessageIsTyping />
                  ) : (
                    message?.body || <ConversationNoMessage />
                  )}
                </Typography>
              </Box>
              {message && (
                <Box display="flex" justifyContent="space-between" width="100%">
                  <MessageSentAt sentAt={message.sentAt} />
                  <MessageStatus status={message.status} />
                </Box>
              )}
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default memo(ConversationRow);
