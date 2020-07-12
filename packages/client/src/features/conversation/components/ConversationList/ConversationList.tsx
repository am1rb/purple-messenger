import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import {
  loadConversationList,
  unloadConversationList,
} from "@purple-messenger/core";
import useStyles from "./styles";

interface Props {
  className: string;
}

function ConversationList({ className }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadConversationList());
    return () => {
      dispatch(unloadConversationList())
    };
  }, []);

  return <div className={clsx(classes.root, className)}>conversation list</div>;
}

export default memo(ConversationList);
