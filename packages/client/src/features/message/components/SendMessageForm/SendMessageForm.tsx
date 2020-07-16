import React, { useCallback } from "react";
import { Box, IconButton } from "@material-ui/core";
import UnformTextField from "components/UnformTextField";
import Unform from "components/Unform";
import SendIcon from "@material-ui/icons/Send";

interface Props {
  disabled: boolean;
}

function SendMessageForm({ disabled }: Props) {
  const handleSubmit = useCallback(() => {}, []);

  return (
    <Unform onSubmit={handleSubmit}>
      <Box display="flex" alignItems="center">
        <Box flexShrink="0" flexGrow="1">
          <UnformTextField
            name="body"
            multiline
            fullWidth
            disabled={disabled}
            autoFocus
          />
        </Box>
        <Box flexShrink="0" flexGrow="0">
          <IconButton type="submit" disabled={disabled}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Unform>
  );
}

export default SendMessageForm;
