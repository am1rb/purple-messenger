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
import { dispatch } from "core/helper/action";
import Socket from "core/type/socket";
import jwt from "core/helper/jwt";
import { joinQueue, leaveQueue } from "../core/helper/queue";

export const sampleProfiles: ProfileInfo[] = [
  {
    id: 1,
    username: "demo",
    image: "https://picsum.photos/200",
    firstName: "Demo",
    lastName: "Demo",
    email: "demo@doe.demo",
    bio: "Hi, My name is John Doe and I'm a demo user",
  },
  {
    id: 2,
    username: "john",
    email: "john@doe.demo",
    bio: "French Southern Territories Ireland",
    firstName: "John",
    lastName: "Doe",
    image: "https://picsum.photos/201",
  },
  {
    id: 3,
    username: "sara",
    email: "sara@doe.demo",
    bio: "Dominica Kazakhstan",
    firstName: "Sara",
    lastName: "Doe",
    image: "https://picsum.photos/202",
  },
];

function auth(socket: Socket) {
  socket.on(
    authActionTypes.auth.saga.signIn,
    ({ email, password }: SingInAction) => {
      const user = sampleProfiles.find(
        (u) =>
          (email === u.username && password === u.username) ||
          (email === u.email && password === u.email)
      );

      if (user) {
        socket.session = {
          id: user.id,
          username: user.username,
        };

        dispatch(socket, setToken(jwt.sign(socket.session)));
        dispatch(socket, setProfileInfo(user));
        joinQueue(socket);
      } else {
        dispatch(socket, signOut());
        dispatch(socket, setAuthError("Email or Password is incorrect"));
        leaveQueue(socket);
      }
    }
  );

  socket.on(
    authActionTypes.auth.saga.verifyToken,
    async ({ token }: VerifyTokenAction) => {
      const session = await jwt.verify(token).catch(() => null);
      const user = sampleProfiles.find((u) => session?.id === u.id);
      if (!!session && user) {
        socket.session = session;
        dispatch(socket, setIsAuthenticated(true));
        dispatch(socket, setProfileInfo(user));
        joinQueue(socket);
      } else {
        dispatch(socket, signOut());
        dispatch(socket, setAuthError("Invalid token"));
        leaveQueue(socket);
        delete socket.session;
      }
    }
  );

  socket.on(authActionTypes.auth.saga.signOut, () => {
    leaveQueue(socket);
    delete socket.session;
  });
}

export default auth;
