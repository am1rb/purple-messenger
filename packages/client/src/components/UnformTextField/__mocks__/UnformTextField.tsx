import React from "react";

interface TextAreaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  multiline: true;
}

type InputProps = React.HTMLAttributes<HTMLInputElement>;

type TagProps = TextAreaProps & InputProps;

export interface UnformTextFieldProps extends TagProps {
  fullWidth?: boolean;
  label?: string;
}

function UnformTextField({
  multiline,
  fullWidth,
  label,
  ...other
}: UnformTextFieldProps) {
  const field = multiline ? (
    <textarea data-testid="mock-unform-text-field" {...other} />
  ) : (
    <input data-testid="mock-unform-text-field" {...other} />
  );

  return label ? (
    <label>
      {label}
      {field}
    </label>
  ) : (
    field
  );
}

export default UnformTextField;
