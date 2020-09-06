import React from "react";
import { SubmitHandler } from "@rocketseat/unform";

interface UnformProps<T> {
  initialData?: Partial<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
}

function Unform<T>({ initialData, onSubmit, children }: UnformProps<T>) {
  return (
    <form onSubmit={() => onSubmit(initialData as T, {} as any)}>
      {children}
    </form>
  );
}
export default Unform;
