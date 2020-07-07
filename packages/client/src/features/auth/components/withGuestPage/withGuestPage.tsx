import React, { ComponentType } from 'react';
import { Redirect } from 'react-router';
import withAuthBase from '../withAuthBase/withAuthBase';

function RedirectToRoot() {
  return <Redirect to="/" />;
}

function withGuestPage<T>(C: ComponentType<T>) {
  return withAuthBase(RedirectToRoot, C);
}

export default withGuestPage;
