import { Routes, RouteAuthMode } from 'core/type/route';
import Conversation from './pages/Conversation';

const routes: Routes = [
  {
    path: '/',
    component: Conversation,
    authMode: RouteAuthMode.Auth
  }
];

export default routes;
