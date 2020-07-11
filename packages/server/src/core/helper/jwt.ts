import jwt from "jsonwebtoken";
import { jwtSecret, jwtMaxAge, jwtAlgorithm } from "./config";
import Token from "core/type/token";

export function verify(token: string) {
  return new Promise<Token>((resolve, reject) => {
    jwt.verify(token, jwtSecret(), (err, detail) => {
      if (err || !detail) {
        reject(reject);
      } else {
        resolve(detail as Token);
      }
    });
  });
}

export function sign(token: Token) {
  return jwt.sign(token, jwtSecret(), {
    expiresIn: jwtMaxAge(),
    algorithm: jwtAlgorithm(),
  });
}
