import React, { ComponentType } from 'react';
import { isAuthenticated, getToken } from 'features/auth/selectors';
import { useSelector } from 'react-redux';
import VerifyToken from '../VerifyToken';

function withAuthBase<T, U>(
  UserComponent: ComponentType<T>,
  GuestComponent: ComponentType<U>
) {
  return function InnerComponent(props: T | U) {
    const isLoggedIn = useSelector(isAuthenticated);
    const token = useSelector(getToken);

    if(token && !isLoggedIn) {
      return <VerifyToken token={token} />
    } else if (!isLoggedIn) {
      return <GuestComponent {...((props as unknown) as U)} />;
    }

    return <UserComponent {...((props as unknown) as T)} />;
  };
}

export default withAuthBase;
