import React from "react";

interface TextAreaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  multiline: true;
}

type InputProps = React.HTMLAttributes<HTMLInputElement>;

type TagProps = TextAreaProps & InputProps;

interface UnformTextFieldProps extends TagProps {
  fullWidth?: boolean;
}

const unformTextField = jest.fn(
  ({ multiline, fullWidth, ...other }: UnformTextFieldProps) =>
    multiline ? (
      <textarea data-testid="mock-unform-text-field" {...other} />
    ) : (
      <input data-testid="mock-unform-text-field" {...other} />
    )
);

export default unformTextField;
