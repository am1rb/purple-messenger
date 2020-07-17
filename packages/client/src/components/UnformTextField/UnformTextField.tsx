import React, { useRef, useEffect } from 'react';
import TextField, {
  TextFieldProps,
  StandardTextFieldProps
} from '@material-ui/core/TextField';
import { useField } from '@rocketseat/unform';

export type Props = Omit<
  TextFieldProps,
  'name' | 'inputRef' | 'defaultValue' | 'defaultChecked'
> & {
  name: string;
};

function UnformTextField({ name, helperText, ...other }: Props) {
  const ref = useRef();
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'value',
      clearValue: (inputRef: HTMLInputElement) => {
        inputRef.value = '';
      }
    });
  }, [ref.current, fieldName]); // eslint-disable-line

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
