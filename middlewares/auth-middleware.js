import { decodeToken, verifyToken } from "../utils/jwt-utils.js";
import { errorResponse } from "../helpers/response-helper.js";
import { authErrors } from "../constant/message.constant.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1],
      decoded = verifyToken(token);
    if (decoded !== null) {
      req.user = decodeToken(token);
      return next();
    }
  }
  return errorResponse(res, authErrors.INVALID_TOKEN, 401);
};
