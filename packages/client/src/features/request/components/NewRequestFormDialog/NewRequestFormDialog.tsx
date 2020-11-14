import React, { useCallback } from "react";
import yup from "yup";
import Button from "@material-ui/core/Button";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Unform from "components/Unform";
import UnformTextField from "components/UnformTextField";
import schema from "./NewRequestFormDialog.schema";

export type NewRequestFormDialogProps = Pick<DialogProps, "open" | "onClose">;

function NewRequestFormDialog({ open, onClose }: NewRequestFormDialogProps) {
  const handleClose = useCallback(() => {
    onClose?.({}, "backdropClick");
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    console.log("submit");
    handleClose();
  }, [handleClose]);

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <Unform
        schema={schema as yup.ObjectSchema<object>}
        onSubmit={handleSubmit}
      >
        <DialogTitle id="form-dialog-title">New Conversation Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add your friend to the conversation list, please enter his/her
            username here. It will be added to the conversation list when he/she
            accepts the request.
          </DialogContentText>

          <UnformTextField
            autoFocus
            margin="dense"
            name="username"
            label="Username"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Unform>
    </Dialog>
  );
}

export default NewRequestFormDialog;
