import * as yup from "yup";

function demoValueOrSchema(schema: yup.StringSchema) {
  return yup.lazy((value: string) =>
    value !== "demo"
      ? yup
          .string()
          .email()
          .required()
      : yup.string()
  );
}

export default yup.object().shape({
  email: demoValueOrSchema(
    yup
      .string()
      .email()
      .required()
  ),
  password: demoValueOrSchema(
    yup
      .string()
      .min(8)
      .required()
  )
});
