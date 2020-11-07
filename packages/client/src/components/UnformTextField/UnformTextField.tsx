import React, { useRef, useEffect } from "react";
import TextField, {
  TextFieldProps,
  StandardTextFieldProps,
} from "@material-ui/core/TextField";
import { useField } from "@rocketseat/unform";

export type UnformTextFieldProps = Omit<
  TextFieldProps,
  "name" | "inputRef" | "defaultValue" | "defaultChecked"
> & {
  name: string;
};

function UnformTextField({ name, helperText, ...other }: UnformTextFieldProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current as HTMLInputElement,
      path: "value",
      clearValue: () => {
        ref.current!.value = "";
      },
    });
  }, [fieldName]); // eslint-disable-line

  return (
    <TextField
      inputRef={ref}
      defaultValue={defaultValue}
      error={!!error}
      helperText={error || helperText}
      {...(other as StandardTextFieldProps)}
    />
  );
}

export default UnformTextField;
