import React, { useCallback, useState } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/PersonAdd";
import NewRequestFormDialog from "features/request/components/NewRequestFormDialog";

function NewConversationButton() {
  const [open, setOpen] = useState(false);

  const openDialog = useCallback(() => setOpen(true), []);
  const closeDialog = useCallback(() => setOpen(false), []);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        startIcon={<AddIcon />}
        onClick={openDialog}
      >
        New Conversation
      </Button>
      <NewRequestFormDialog open={open} onClose={closeDialog} />
    </>
  );
}

export default NewConversationButton;
