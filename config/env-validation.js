import Joi from "joi";
import { envErrors } from "../constant/message.constant.js";
import * as dotenv from "dotenv";

const ENV = process.env.NODE_ENV || "production";
dotenv.config({
  path: `./.${ENV}.env`,
});
const envSchema = Joi.object({
    PORT: Joi.number().required().messages({
      "number.base": envErrors.PORT_MUST_BE_NUMBER,
      "any.required": envErrors.PORT_REQUIRED,
    }),
    MONGODB_URL: Joi.string().required().messages({
      "string.empty": envErrors.MONGODB_URL_EMPTY,
      "string.base": envErrors.MONGODB_URL_MUST_BE_STRING,
      "any.required": envErrors.MONGODB_URL_REQUIRED,
    }),
    JWT_SECRET: Joi.string().required().messages({
      "string.empty": envErrors.JWT_SECRET_EMPTY,
      "string.base": envErrors.JWT_SECRET_MUST_BE_STRING,
      "any.required": envErrors.JWT_SECRET_REQUIRED,
    }),
    HOST_URL: Joi.string().required().messages({
      "string.empty": envErrors.HOST_URL_EMPTY,
      "string.base": envErrors.HOST_URL_STRING,
      "any.required": envErrors.HOST_URL_REQUIRED,
    }),
  }),
  { value: envVars, error } = envSchema.validate(process.env, {
    allowUnknown: true,
  });
if (error) {
  console.error("Environment validation error:", error.message);
  process.exit(1);
}

const envCaptured = {
  env: ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
  },
  baseURL: envVars.HOST_URL,
};
export default envCaptured;
