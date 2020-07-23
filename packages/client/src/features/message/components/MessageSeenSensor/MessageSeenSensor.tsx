import React, { useCallback, memo } from "react";
import { useDispatch } from "react-redux";
import { Message, MessageStatus, seenMessageAck } from "@purple-messenger/core";
import VisibilitySensor from "react-visibility-sensor";
import useConversation from "features/conversation/components/useConversation";

interface MessageSeenSensorProps extends Pick<Message, "status"> {
  messageId: Message["id"];
  children: React.ReactNode;
}

function MessageSeenSensor({
  status,
  messageId,
  children,
}: MessageSeenSensorProps) {
  const dispatch = useDispatch();
  const { username } = useConversation();

  const handleChange = useCallback(
    (visible: boolean) => {
      if (visible && username) {
        dispatch(seenMessageAck(username, messageId));
      }
    },
    [username, messageId]
  );

  return status !== MessageStatus.Seen ? (
    <VisibilitySensor onChange={handleChange}>{children}</VisibilitySensor>
  ) : (
    <>{children}</>
  );
}

export default memo(MessageSeenSensor);
