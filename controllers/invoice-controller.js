import { errorResponse, successResponse } from "../helpers/response-helper.js";
import {
  invoiceErrors,
  invoiceResponses,
  serverErrors,
} from "../constant/message.constant.js";
import {
  addInvoice,
  invoiceList,
  invoiceView,
} from "../services/invoice-service.js";

export const generateInvoice = async (req, res) => {
  try {
    const { products } = req.body,
      { name, email, userID } = req.user,
      pdfBuffer = await addInvoice(products, name, email, userID);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="invoice.pdf"');
    res.write(pdfBuffer);
    res.end();
  } catch (error) {
    console.log(error, "error");
    return errorResponse(
      res,
      serverErrors.INTERNAL_SERVER_ERROR,
      500,
      error.stack
    );
  }
};

export const userInvoiceList = async (req, res) => {
  const { userID } = req.user;
  try {
    const invoiceData = await invoiceList(userID);
    return successResponse(res, invoiceResponses.LIST_SUCCESS, invoiceData);
  } catch (error) {
    console.log(error, "error");
    return errorResponse(
      res,
      serverErrors.INTERNAL_SERVER_ERROR,
      500,
      error.stack
    );
  }
};

export const generatePDF = async (req, res) => {
  const invoiceID = req.params.invoiceID;
  try {
    const pdfBuffer = await invoiceView(invoiceID, false);
    if (pdfBuffer === null)
      return errorResponse(res, invoiceErrors.INVOICE_NOT_FOUND, 404);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="invoice.pdf"');
    res.write(pdfBuffer);
    res.end();
  } catch (error) {
    console.log(error, "error");
    return errorResponse(
      res,
      serverErrors.INTERNAL_SERVER_ERROR,
      500,
      error.stack
    );
  }
};

export const generateImage = async (req, res) => {
  const invoiceID = req.params.invoiceID;
  try {
    const pngBuffer = await invoiceView(invoiceID, true);
    if (pngBuffer === null)
      return errorResponse(res, invoiceErrors.INVOICE_NOT_FOUND, 404);
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Disposition", 'attachment; filename="invoice.png"');
    res.write(pngBuffer);
    res.end();
  } catch (error) {
    console.log(error, "error");
    return errorResponse(
      res,
      serverErrors.INTERNAL_SERVER_ERROR,
      500,
      error.stack
    );
  }
};
