import type { Algorithm } from "jsonwebtoken";

export function jwtSecret() {
  return 'default token';
}

export function jwtMaxAge() {
  return 300;
}

export function jwtAlgorithm(): Algorithm {
  return 'HS256';
}