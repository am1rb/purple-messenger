import React from 'react';
import { Route, Switch } from 'react-router';
import withAuthPage from 'features/auth/components/withAuthPage';
import withGuestPage from 'features/auth/components/withGuestPage';
import routes from 'core/routes';
import { RouteAuthMode } from 'core/type/route';

const routeAuthModeMap = {
  [RouteAuthMode.Auth]: withAuthPage,
  [RouteAuthMode.Guest]: withGuestPage,
  [RouteAuthMode.None]: null
};

const authRoutes = routes.map(route => {
  const authFunc = routeAuthModeMap[route.authMode];
  const item = {
    ...route,
    component: authFunc ? authFunc!(route.component!) : route.component
  };
  delete item.authMode;
  return item;
});

function PageRouter() {
  return (
    <Switch>
      {authRoutes.map((route, idx) => (
        <Route key={idx} {...route} />
      ))}
    </Switch>
  );
}

export default PageRouter;
