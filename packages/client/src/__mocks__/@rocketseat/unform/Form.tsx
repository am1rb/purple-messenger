import React from "react";

interface FormProps {
  children: React.ReactNode;
}

function Form({ children }: FormProps) {
  return <form data-testid="mock-form">{children}</form>;
}

export default Form;
