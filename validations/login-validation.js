import Joi from "joi";
import { authErrors } from "../constant/message.constant.js";
import userRegex from "../constant/regex.constant.js";

export const loginSchema = Joi.object({
  email: Joi.string().pattern(userRegex.EMAIL_REGEX).required().messages({
    "any.required": authErrors.EMAIL_REQUIRED,
    "string.empty": authErrors.EMAIL_EMPTY,
    "string.base": authErrors.EMAIL_STRING,
    "string.pattern.base": authErrors.EMAIL_INVALID,
  }),
  password: Joi.string().pattern(userRegex.PASSWORD_REGEX).required().messages({
    "any.required": authErrors.PASSWORD_REQUIRED,
    "string.empty": authErrors.PASSWORD_EMPTY,
    "string.base": authErrors.PASSWORD_STRING,
    "string.pattern.base": authErrors.INVALID_PASSWORD,
  }),
});
