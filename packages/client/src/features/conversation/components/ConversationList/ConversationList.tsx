import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import {
  loadConversationList,
  unloadConversationList,
} from "@purple-messenger/core";
import { Box } from "@material-ui/core";
import { getConversationList } from "features/conversation/selectors";
import ConversationRow from "../ConversationRow";
import useStyles from "./styles";

interface Props {
  className: string;
}

function ConversationList({ className }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const conversations = useSelector(getConversationList);

  useEffect(() => {
    dispatch(loadConversationList());
    return () => {
      dispatch(unloadConversationList());
    };
  }, []);

  return (
    <Box className={clsx(classes.root, className)} p={1}>
      {conversations.toArray().map(([, conversation]) => (
        <ConversationRow key={conversation.id} {...conversation} />
      ))}
    </Box>
  );
}

export default memo(ConversationList);
