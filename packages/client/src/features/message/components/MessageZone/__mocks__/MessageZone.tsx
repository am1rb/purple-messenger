import React from "react";

interface MessageZoneProps {
  friendUsername: string | undefined;
}

function MessageZone({ friendUsername }: MessageZoneProps) {
  return <div data-testid="mock-message-zone" data-username={friendUsername} />;
}

export default MessageZone;
