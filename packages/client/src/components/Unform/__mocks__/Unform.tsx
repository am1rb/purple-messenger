import React from "react";
import { SubmitHandler } from "@rocketseat/unform";
import { StringObject } from "core/type/general";

interface UnformProps<T> {
  initialData?: Partial<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
}

const helpers = {
  resetForm: () => {},
};

function Unform<T>({ initialData, onSubmit, children }: UnformProps<T>) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data: StringObject = {};

    const elements = event.currentTarget.elements;
    for (let i = 0; i < elements.length; i++) {
      const input = elements[i] as HTMLInputElement;
      data[input.name] = input.value;
    }

    onSubmit(data as T, helpers as any);
  }

  return <form onSubmit={handleSubmit}>{children}</form>;
}
export default Unform;
