import React, { memo } from "react";
import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getMessageList } from "features/message/selectors";
import MessageRow from '../MessageRow';

function MessageList() {
  const messageList = useSelector(getMessageList);

  return <Box>
    {messageList.toArray().map(([id, message]) => (
      <MessageRow key={id} {...message} />
    ))}

  </Box>;
}

export default memo(MessageList);
