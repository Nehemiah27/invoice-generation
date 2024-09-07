import { userErrors, userResponses } from "../constant/message.constant.js";
import { successResponse, errorResponse } from "../helpers/response-helper.js";
import { isEmailUnique, createNewUser } from "../services/user-service.js";

export const createUserController = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    if (user.code === 200)
      return successResponse(res, userResponses.USER_CREATE_SUCCESS);
    else return errorResponse(res, userErrors.DUPLICATE_USER, 409);
  } catch (error) {
    next(error);
  }
};

const createUser = async (userInfo) => {
  const email = userInfo.email.trim().toLowerCase(),
    uniqueStatus = await isEmailUnique(email);
  if (!uniqueStatus)
    return { code: 409, message: userErrors.DUPLICATE_USER, success: false };
  await createNewUser(userInfo, email);
  return {
    code: 200,
    success: true,
  };
};
