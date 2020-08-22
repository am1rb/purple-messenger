import React from "react";

interface MessageZoneProps {
  friendUsername: string | undefined;
}

const messageZone = jest.fn(({ friendUsername }: MessageZoneProps) => (
  <div data-testid="message-zone" data-username={friendUsername} />
));

export default messageZone;
