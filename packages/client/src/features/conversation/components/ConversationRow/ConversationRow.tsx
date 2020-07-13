import React from 'react';
import { Conversation } from '@purple-messenger/core';
import { Card, CardActionArea, CardContent, Box, Avatar, Typography } from '@material-ui/core';
import MessageStatus from 'features/message/components/MessageStatus';
import useStyles from './styles';
import MessageSentAt from 'features/message/components/MessageSentAt';

export type Props = Conversation;

function ConversationRow({message, friend}: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Box display="flex">
            <Avatar src={friend.image} />
            <Box ml={1} overflow="hidden">
              <Box>
                <Typography noWrap>{friend.firstName} {friend.lastName}</Typography>
                <Typography variant="subtitle2" noWrap color="textSecondary" gutterBottom>{message.body}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <MessageSentAt sentAt={message.sentAt} />
                <MessageStatus status={message.status} />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ConversationRow;
