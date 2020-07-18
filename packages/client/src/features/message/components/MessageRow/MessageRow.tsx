import React from "react";
import { Box, Card } from "@material-ui/core";
import { Message } from "@purple-messenger/core";
import MessageStatus from "../MessageStatus";

export type Props = Message;

function MessageRow({ body, status }: Props) {
  return (
    <Box m={1}>
      <Card>
        {body}
        <Box display="flex">
          <MessageStatus status={status} />
        </Box>
      </Card>
    </Box>
  );
}

export default MessageRow;
