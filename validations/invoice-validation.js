import Joi from "joi";
import { invoiceErrors } from "../constant/message.constant.js";

const productSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": invoiceErrors.PRODUCT_NAME_STRING,
    "string.empty": invoiceErrors.PRODUCT_NAME_STRING,
    "any.required": invoiceErrors.PRODUCT_NAME_REQUIRED,
  }),
  qty: Joi.number().integer().min(1).required().messages({
    "number.base": invoiceErrors.QTY_NUMBER,
    "number.integer": invoiceErrors.QTY_INTEGER,
    "number.min": invoiceErrors.QTY_MIN,
    "any.required": invoiceErrors.QTY_REQUIRED,
  }),
  rate: Joi.number().positive().required().messages({
    "number.base": invoiceErrors.RATE_NUMBER,
    "number.positive": invoiceErrors.RATE_POSITIVE,
    "any.required": invoiceErrors.RATE_REQUIRED,
  }),
});

export const invoiceSchema = Joi.object({
  products: Joi.array().items(productSchema).min(1).required().messages({
    "array.base": invoiceErrors.PRODUCT_ARRAY,
    "array.min": invoiceErrors.PRODUCT_MIN,
    "any.required": invoiceErrors.PRODUCT_REQUIRED,
  }),
});
