import { errorResponse } from "../helpers/response-helper.js";

export const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return errorResponse(res, error.details[0].message, 400);
  next();
};
