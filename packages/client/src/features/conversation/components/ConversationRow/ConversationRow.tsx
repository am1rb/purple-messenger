import React, { memo } from "react";
import clsx from "clsx";
import { Conversation, MessageOwner } from "@purple-messenger/core";
import { Card, CardContent, Box, Avatar, Typography } from "@material-ui/core";
import MessageStatus from "features/message/components/MessageStatus";
import MessageSentAt from "features/message/components/MessageSentAt";
import CardActionArea from "components/CardActionArea";
import iff from "core/helper/iff";
import useStyles from "./styles";

export interface Props extends Conversation {
  selected: boolean;
}

function ConversationRow({ message, friend, selected, isTyping }: Props) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, iff(selected, classes.selected))}>
      <CardActionArea to={"/conversation/@" + friend.username} disableRipple>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Avatar src={friend.image} />
            <Box ml={1} overflow="hidden">
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
                  {message?.owner===MessageOwner.Me && 'You: '}
                  {isTyping ? "Typing..." : message?.body || "No message"}
                </Typography>
              </Box>
              {message && (
                <Box display="flex" justifyContent="space-between">
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
