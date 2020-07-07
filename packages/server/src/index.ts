import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import socketIo from 'socket.io';
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

const serverPort = 8000;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const server = createServer(app);
const io = socketIo(server);

server.listen(serverPort, function() {
  console.log('server run on ' + serverPort);
});

const demoAccount = 'demo';
const testToken = 'test-token';
const testProfileInfo: ProfileInfo = {
  image: 'https://picsum.photos/200',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.demo',
  bio: "Hi, My name is John Doe and I'm a demo user",
};

io.on('connection', socket => {
  const client = (function(socket) {
    return {
      dispatch: (action: { type: string }) => {
        socket.emit('dispatch', action);
      },
    };
  })(socket);

  socket.on(authActionTypes.auth.saga.signIn, (message: SingInAction) => {
    if (message.email === demoAccount && message.password === demoAccount) {
      client.dispatch(setToken(testToken));
      client.dispatch(setProfileInfo(testProfileInfo));
    } else {
      client.dispatch(setAuthError('Email or Password is incorrect'));
      client.dispatch(setIsAuthenticated(false));
    }
  });

  socket.on(
    authActionTypes.auth.saga.verifyToken,
    (message: VerifyTokenAction) => {
      if (message.token === testToken) {
        client.dispatch(setIsAuthenticated(true));
        client.dispatch(setProfileInfo(testProfileInfo));
      } else {
        client.dispatch(setAuthError('Invalid token'));
        client.dispatch(signOut());
      }
    },
  );

  socket.on(authActionTypes.auth.saga.signOut, () => {
    // remove token from server
    console.log('signout');
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
  });
});