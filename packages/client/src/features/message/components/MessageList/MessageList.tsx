import React, { memo, useEffect } from "react";
import { Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getMessageList } from "features/message/selectors";
import MessageRow from "../MessageRow";
import useConversation from "features/conversation/components/useConversation";
import { clearMessageList } from "@purple-messenger/core";

function MessageList() {
  const messageList = useSelector(getMessageList);
  const {username} = useConversation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessageList());
  }, [username]);

  return (
    <Box>
      {messageList.toArray().map(([id, message]) => (
        <MessageRow key={id} {...message} />
      ))}
    </Box>
  );
}

export default memo(MessageList);
