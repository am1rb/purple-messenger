import React, { memo } from 'react';
import Layout from 'features/layout/components/Layout';
import ConversationList from 'features/conversation/components/ConversationList';
import MessageZone from 'features/message/components/MessageZone';
import useStyles from './styles';

function Conversation() {
  const classes = useStyles();
  return (
    <Layout classes={{ content: classes.content }}>
      <ConversationList className={classes.conversationList} />
      <MessageZone className={classes.messageZone} />
    </Layout>
  );
}

export default memo(Conversation);
