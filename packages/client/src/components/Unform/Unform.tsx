import React from 'react';
import { Form, SubmitHandler } from '@rocketseat/unform';
import { FormProps } from '@rocketseat/unform/dist/Form';

type Props<T> = Omit<FormProps, 'initialData' | 'onSubmit'> & {
  initialData?: Partial<T>;
  onSubmit: SubmitHandler<T>;
};

function Unform<T>(props: Props<T>) {
  return <Form {...(props as FormProps)} />;
}
export default Unform;
