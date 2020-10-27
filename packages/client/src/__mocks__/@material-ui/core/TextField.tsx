import React from "react";
import type { TextFieldProps } from "@material-ui/core/TextField";

function MuiTextField({
  helperText,
  label,
  defaultValue,
  inputRef,
}: TextFieldProps) {
  const input = (
    <>
      <input
        ref={inputRef}
        type="text"
        data-testid="mock-mui-text-field"
        defaultValue={defaultValue as string}
      />
      {helperText && (
        <span data-testid="mock-mui-text-field-helper-text">{helperText}</span>
      )}
    </>
  );
  return label ? (
    <label>
      <span data-testid="mock-mui-text-field-label">{label}</span>
      {input}
    </label>
  ) : (
    input
  );
}

export default MuiTextField;
