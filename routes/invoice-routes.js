import express from "express";
import { validateRequest } from "../middlewares/validation-middleware.js";
import { invoiceSchema } from "../validations/invoice-validation.js";
import {
  generateImage,
  generateInvoice,
  generatePDF,
  userInvoiceList,
} from "../controllers/invoice-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/invoices/generate:
 *   post:
 *     summary: Generation of Invoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 $ref: '#/components/schemas/ProductArray'
 *     responses:
 *       200:
 *         description: PDF generated Successfully with blob link, download will be started when clicked
 *       401:
 *         description: Incorrect Token provided
 *       500:
 *         description: Server is allocated at the moment
 */
router.post(
  "/generate",
  authMiddleware,
  validateRequest(invoiceSchema),
  generateInvoice
);

/**
 * @swagger
 * /api/v1/invoices/view-quotations:
 *   post:
 *     summary: Quotations of User
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Invoices list generated Successfully
 *       401:
 *         description: Incorrect Token provided
 *       500:
 *         description: Server is allocated at the moment
 */
router.post("/view-quotations", authMiddleware, userInvoiceList);

/**
 * @swagger
 * /api/v1/invoices/generate-img/{invoiceID}:
 *   get:
 *     summary: Invoice image download
 *     tags: [Invoices]
 *     parameters:
 *       - name: invoiceID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Image generated Successfully with blob link, download will be started when clicked
 *       500:
 *         description: Server is allocated at the moment
 */
router.get("/generate-img/:invoiceID", generateImage);

/**
 * @swagger
 * /api/v1/invoices/generate-pdf/{invoiceID}:
 *   get:
 *     summary: Invoice PDF download
 *     tags: [Invoices]
 *     parameters:
 *       - name: invoiceID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PDF generated Successfully with blob link, download will be started when clicked
 *       500:
 *         description: Server is allocated at the moment
 */
router.get("/generate-pdf/:invoiceID", generatePDF);

export default router;
