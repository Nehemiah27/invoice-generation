import User from "../models/users.js";
import { v4 as uuid } from "uuid";
import { hashPassword } from "./encryption-service.js";

export const isEmailUnique = async (email) => {
  const user = await User.find({
    email,
  }).lean();
  if (user && user.length) return false;
  return true;
};

export const createNewUser = async (userInfo, email) => {
  await User.create({
    ...userInfo,
    email,
    password: await hashPassword(userInfo.password),
    userID: uuid(),
  });
};
