import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import yup from "yup";
import { Button } from "@material-ui/core";
import Unform from "components/Unform";
import UnformTextField from "components/UnformTextField";
import { SignInFormContent } from "../../types/formContent";
import { signIn, setAuthError } from "@purple-messenger/core";
import { getAuthError } from "features/auth/selectors";
import schema from "./SignInForm.schema";
import useStyles from "./SignInForm.styles";

function SignInForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authError = useSelector(getAuthError);

  const handleSubmit = useCallback(
    (content: SignInFormContent) => {
      dispatch(setAuthError(""));
      dispatch(signIn(content.email, content.password));
    },
    [dispatch]
  );

  return (
    <Unform<SignInFormContent>
      schema={schema as yup.ObjectSchema<object>}
      onSubmit={handleSubmit}
      className={classes.form}
    >
      {authError}
      <UnformTextField name="email" label="Email" margin="normal" />
      <UnformTextField
        name="password"
        type="password"
        label="Password"
        autoComplete="current-password"
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        SignIn
      </Button>
    </Unform>
  );
}

export default memo(SignInForm);
