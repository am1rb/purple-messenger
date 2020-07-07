import { RouteProps } from 'react-router';

export enum RouteAuthMode {
  Auth = 1,
  Guest,
  None
}

export interface Route
  extends Pick<RouteProps, 'path' | 'exact' | 'component'> {
  authMode: RouteAuthMode;
}

export type Routes = Route[];
