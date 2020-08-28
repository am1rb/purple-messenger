import React, { memo } from "react";
import Layout from "features/layout/components/Layout";
import ConversationList from "features/conversation/components/ConversationList";
import MessageZone from "features/message/components/MessageZone";
import useConversationInfo from "features/conversation/components/useConversationInfo";
import useStyles from "./Conversation.styles";

function Conversation() {
  const classes = useStyles();
  const { username } = useConversationInfo();

  return (
    <Layout classes={{ content: classes.content }}>
      <ConversationList
        className={classes.conversationList}
        username={username}
      />
      <MessageZone className={classes.messageZone} username={username} />
    </Layout>
  );
}

export default memo(Conversation);
