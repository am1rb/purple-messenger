import { ComponentType } from "react";
import withAuthBase from "../withAuthBase/withAuthBase";
import SignInForm from "features/auth/components/SignInForm";

function withAuthPage<T>(C: ComponentType<T>) {
  return withAuthBase(C, SignInForm);
}

export default withAuthPage;
