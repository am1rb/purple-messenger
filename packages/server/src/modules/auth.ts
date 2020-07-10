import {
  authActionTypes,
  SingInAction,
  setIsAuthenticated,
  setAuthError,
  setToken,
  VerifyTokenAction,
  ProfileInfo,
  setProfileInfo,
  signOut,
} from '@purple-messenger/core';
import { dispatch } from 'core/helper/client';
import type { Socket } from 'socket.io';

const demoAccount = 'demo';
const testToken = 'test-token';
const testProfileInfo: ProfileInfo = {
  image: 'https://picsum.photos/200',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.demo',
  bio: "Hi, My name is John Doe and I'm a demo user",
};

function auth(socket: Socket) {

  socket.on(authActionTypes.auth.saga.signIn, (message: SingInAction) => {
    if (message.email === demoAccount && message.password === demoAccount) {
      dispatch(socket, setToken(testToken));
      dispatch(socket, setProfileInfo(testProfileInfo));
    } else {
      dispatch(socket, setAuthError('Email or Password is incorrect'));
      dispatch(socket, setIsAuthenticated(false));
    }
  });

  socket.on(
    authActionTypes.auth.saga.verifyToken,
    (message: VerifyTokenAction) => {
      if (message.token === testToken) {
        dispatch(socket, setIsAuthenticated(true));
        dispatch(socket, setProfileInfo(testProfileInfo));
      } else {
        dispatch(socket, setAuthError('Invalid token'));
        dispatch(socket, signOut());
      }
    },
  );

  socket.on(authActionTypes.auth.saga.signOut, () => {
    // remove token from server
    console.log('signout');
  });
}

export default auth;