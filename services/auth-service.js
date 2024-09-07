import User from "../models/users.js";
import { authErrors, authResponses } from "../constant/message.constant.js";
import { comparePassword } from "./encryption-service.js";
import { generateToken } from "../utils/jwt-utils.js";

export const userAuth = async (email, userPassword) => {
  const user = await User.find({
    email,
  }).lean();
  if (!user || !user.length)
    return {
      code: 404,
      message: authErrors.USER_NOT_FOUND,
    };
  const compareResult = await comparePassword(userPassword, user[0].password);
  if (!compareResult)
    return { code: 401, message: authErrors.INVALID_PASSWORD };
  const accessToken = generateToken(user[0]),
    { password, __v, updatedAt, createdAt, _id, ...userData } = user[0];
  return {
    code: 200,
    data: { ...userData, accessToken },
    message: authResponses.AUTH_SUCCESS,
  };
};
