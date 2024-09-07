import jwt from "jsonwebtoken";
import envCaptured from "../config/env-validation.js";

export const generateToken = (user) => {
  const payload = { userID: user.userID, name: user.name, email: user.email };
  return jwt.sign(payload, envCaptured.jwt.secret);
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, envCaptured.jwt.secret, {
      ignoreExpiration: true,
    });
  } catch (error) {
    return null;
  }
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};
