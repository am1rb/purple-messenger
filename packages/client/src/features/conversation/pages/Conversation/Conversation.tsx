import React, { memo } from "react";
import Layout from "features/layout/components/Layout";
import MessageZone from "features/message/components/MessageZone";
import useConversationInfo from "features/conversation/components/useConversationInfo";
import useStyles from "./Conversation.styles";
import SidePanel from "features/conversation/components/SidePanel";

function Conversation() {
  const classes = useStyles();
  const { username } = useConversationInfo();

  return (
    <Layout classes={{ content: classes.content }}>
      <SidePanel className={classes.sidePanel} />
      <MessageZone className={classes.messageZone} username={username} />
    </Layout>
  );
}

export default memo(Conversation);
