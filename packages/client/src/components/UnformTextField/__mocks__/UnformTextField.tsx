import React from "react";

interface TextAreaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  multiline: true;
}

type InputProps = React.HTMLAttributes<HTMLInputElement>;

type TagProps = TextAreaProps & InputProps;

export interface UnformTextFieldProps extends TagProps {
  fullWidth?: boolean;
}

function UnformTextField({
  multiline,
  fullWidth,
  ...other
}: UnformTextFieldProps) {
  return multiline ? (
    <textarea data-testid="mock-unform-text-field" {...other} />
  ) : (
    <input data-testid="mock-unform-text-field" {...other} />
  );
}

export default UnformTextField;
