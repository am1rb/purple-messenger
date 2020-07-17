import React, { useMemo } from 'react';
import { Form, SubmitHandler } from '@rocketseat/unform';
import { FormProps } from '@rocketseat/unform/dist/Form';

type Props<T> = Omit<FormProps, 'initialData' | 'onSubmit'> & {
  initialData?: Partial<T>;
  onSubmit: SubmitHandler<T>;
};

function Unform<T>({initialData: initialDataProp, ...other}: Props<T>) {
  const initialData = useMemo(() => initialDataProp, []);
  return <Form {...(other as FormProps)} initialData={initialData} />;
}
export default Unform;
