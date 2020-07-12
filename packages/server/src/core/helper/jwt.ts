import jwt from "jsonwebtoken";
import { jwtSecret, jwtMaxAge, jwtAlgorithm } from "./config";
import Session from "core/type/session";

export function verify(token: string) {
  return new Promise<Session>((resolve, reject) => {
    jwt.verify(token, jwtSecret(), (err, detail) => {
      if (err || !detail) {
        reject(reject);
      } else {
        resolve(detail as Session);
      }
    });
  });
}

export function sign(token: Session) {
  return jwt.sign(token, jwtSecret(), {
    expiresIn: jwtMaxAge(),
    algorithm: jwtAlgorithm(),
  });
}

export default {
  verify,
  sign,
}