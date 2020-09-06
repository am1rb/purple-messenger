import React, { useMemo } from "react";
import { Form, SubmitHandler } from "@rocketseat/unform";
import { FormProps } from "@rocketseat/unform/dist/Form";

interface UnformProps<T> extends Omit<FormProps, "initialData" | "onSubmit"> {
  initialData?: Partial<T>;
  onSubmit: SubmitHandler<T>;
}

function Unform<T>({ initialData: initialDataProp, ...other }: UnformProps<T>) {
  const initialData = useMemo(() => initialDataProp, []);
  return <Form {...(other as FormProps)} initialData={initialData} />;
}
export default Unform;
