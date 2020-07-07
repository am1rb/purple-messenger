import { ComponentType } from 'react';
import withAuthBase from '../withAuthBase/withAuthBase';
import LoginForm from 'features/auth/components/SignInForm';

function withAuthPage<T>(C: ComponentType<T>) {
  return withAuthBase(C, LoginForm);
}

export default withAuthPage;
