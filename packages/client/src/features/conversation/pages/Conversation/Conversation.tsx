import React, { memo } from 'react';
import Layout from 'features/layout/components/Layout';
import ConversationList from 'features/conversation/components/ConversationList';
import MessageZone from 'features/message/components/MessageZone';
import useConversation from 'features/conversation/components/useConversation';
import useStyles from './Conversation.styles';

function Conversation() {
  const classes = useStyles();
  const { username } = useConversation();
  
  return (
    <Layout classes={{ content: classes.content }}>
      <ConversationList className={classes.conversationList} friendUsername={username} />
      <MessageZone className={classes.messageZone} friendUsername={username} />
    </Layout>
  );
}

export default memo(Conversation);
