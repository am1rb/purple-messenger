import * as yup from "yup";

function demoValueOrSchema(schema: yup.StringSchema<string>) {
  return yup.lazy((value: string) => 
    value !== "demo"
      ? schema
      : yup.string().required()
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
