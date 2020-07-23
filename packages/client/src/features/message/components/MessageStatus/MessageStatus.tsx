import React from "react";
import clsx from "clsx";
import DoneIcon from "@material-ui/icons/Done";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { MessageStatus as Status } from "@purple-messenger/core";
import useStyles from "./styles";

interface Props {
  status: Status;
}

function MessageStatus({ status }: Props) {
  const classes = useStyles();
  return (
    <span>
      {status === Status.Pending && <ScheduleIcon fontSize="small" color="action" />}
      {status === Status.Sent && <DoneIcon fontSize="small" color="action" />}
      {status === Status.Received && <DoneAllIcon fontSize="small" color="action" />}
      {status === Status.Seen && <DoneAllIcon fontSize="small" color="primary" />}
    </span>
  );
}

export default MessageStatus;
