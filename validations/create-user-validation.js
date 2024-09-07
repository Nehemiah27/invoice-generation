import Joi from "joi";
import userRegex from "../constant/regex.constant.js";
import { userErrors } from "../constant/message.constant.js";

export const userSchema = Joi.object({
  name: Joi.string().pattern(userRegex.NAME_REGEX).required().messages({
    "any.required": userErrors.NAME_REQUIRED,
    "string.empty": userErrors.NAME_EMTPY,
    "string.base": userErrors.NAME_STRING,
    "string.pattern.base": userErrors.NAME_INVALID,
  }),
  email: Joi.string().pattern(userRegex.EMAIL_REGEX).required().messages({
    "any.required": userErrors.EMAIL_REQUIRED,
    "string.empty": userErrors.EMAIL_EMPTY,
    "string.base": userErrors.EMAIL_STRING,
    "string.pattern.base": userErrors.EMAIL_INVALID,
  }),
  password: Joi.string().pattern(userRegex.PASSWORD_REGEX).required().messages({
    "any.required": userErrors.PASSWORD_REQUIRED,
    "string.empty": userErrors.PASSWORD_EMPTY,
    "string.base": userErrors.PASSWORD_STRING,
    "string.pattern.base": userErrors.PASSWORD_INVALID,
  }),
});
