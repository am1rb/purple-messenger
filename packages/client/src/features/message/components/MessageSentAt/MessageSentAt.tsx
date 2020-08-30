import React, { useEffect, useState } from "react";
import moment from "moment";
import { Message } from "@purple-messenger/core";
import { Typography } from "@material-ui/core";

export type MessageSentAtProps = Pick<Message, "sentAt">;

function MessageSentAt({ sentAt }: MessageSentAtProps) {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const timerRef = setInterval(() => forceUpdate((v) => v + 1), 60 * 1000);
    return () => clearInterval(timerRef);
  }, []);

  return (
    <Typography variant="caption" color="textSecondary">
      {moment(sentAt).fromNow()}
    </Typography>
  );
}

export default MessageSentAt;
