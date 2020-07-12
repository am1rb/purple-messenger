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
} from "@purple-messenger/core";
import { dispatch } from "core/helper/client";
import Socket from "core/type/socket";
import jwt from "core/helper/jwt";

const demoAccount = "demo";
const testUserId = 1;
const testProfileInfo: ProfileInfo = {
  image: "https://picsum.photos/200",
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.demo",
  bio: "Hi, My name is John Doe and I'm a demo user",
};

function auth(socket: Socket) {
  socket.on(
    authActionTypes.auth.saga.signIn,
    ({ email, password }: SingInAction) => {
      if (email === demoAccount && password === demoAccount) {
        socket.session = { id: testUserId };

        dispatch(socket, setToken(jwt.sign(socket.session)));
        dispatch(socket, setProfileInfo(testProfileInfo));
      } else {
        dispatch(socket, signOut());
        dispatch(socket, setAuthError("Email or Password is incorrect"));
      }
    }
  );

  socket.on(
    authActionTypes.auth.saga.verifyToken,
    async ({ token }: VerifyTokenAction) => {
      const session = await jwt.verify(token).catch(() => null);
      if (!!session) {
        socket.session = session;
        dispatch(socket, setIsAuthenticated(true));
        dispatch(socket, setProfileInfo(testProfileInfo));
      } else {
        delete socket.session;
        dispatch(socket, signOut());
        dispatch(socket, setAuthError("Invalid token"));
      }
    }
  );

  socket.on(authActionTypes.auth.saga.signOut, () => {
    delete socket.session;
  });
}

export default auth;
