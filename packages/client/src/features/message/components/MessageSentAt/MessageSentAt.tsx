import React, { useEffect, useState } from "react";
import moment from 'moment';
import { Message } from "@purple-messenger/core";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";

export type Props = Pick<Message, 'sentAt'>;

function MessageSentAt({ sentAt }: Props) {
  const classes = useStyles();
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const timerRef = setInterval(() => forceUpdate(v => v+1), 60*1000);
    return () => clearInterval(timerRef);
  }, []);


  return (
    <Typography variant="caption" color="textSecondary">
      {moment(sentAt).fromNow()}
    </Typography>
  );
}

export default MessageSentAt;
