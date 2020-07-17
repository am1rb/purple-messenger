import { Routes, RouteAuthMode } from 'core/type/route';
import Conversation from './pages/Conversation';

const routes: Routes = [
  {
    path: ['/conversation/@:username', '/'],
    component: Conversation,
    exact: true,
    authMode: RouteAuthMode.Auth
  }
];

export default routes;
