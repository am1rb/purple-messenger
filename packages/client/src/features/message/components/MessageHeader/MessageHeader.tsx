import React from "react";
import Box from "@material-ui/core/Box";
import useTheme from "@material-ui/core/styles/useTheme";
import CallButton from "features/call/components/CallButton";

interface MessageHeaderProps {
  disabled: boolean;
}

function MessageHeader({ disabled }: MessageHeaderProps) {
  const theme = useTheme();
  return (
    <Box
      height={6 * theme.spacing()}
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      padding={1}
      flexShrink="0"
      flexGrow="0"
    >
      <CallButton disabled={disabled} />
    </Box>
  );
}

export default MessageHeader;
