import { formatDate, amountInINR } from "../utils/invoice-utils.js";
import { v4 as uuid } from "uuid";
import Product from "../models/products.js";
import puppeteer from "puppeteer";
import envCaptured from "../config/env-validation.js";

export const addInvoice = async (products, name, email, userID) => {
  const total = products
      .reduce((sum, product) => sum + product.qty * product.rate, 0)
      .toFixed(0),
    gst = (total * 0.18).toFixed(0),
    grandTotal = Number(total) + Number(gst),
    invoiceDate = formatDate(new Date(Date.now())),
    expiryDate = formatDate(new Date(Date.now() + 364 * 24 * 60 * 60 * 1000)),
    invoiceData = {
      products,
      userID,
      name,
      email,
      invoiceDate,
      expiryDate,
      gst,
      total,
      grandTotal,
    },
    html = htmlGen(invoiceData);
  await storeInvoice(invoiceData);
  return await generateBill(html, false);
};

export const invoiceList = async (userID) => {
  return await Product.aggregate([
    {
      $match: { userID },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        imgDownloadLink: {
          $concat: [
            `${envCaptured.baseURL}/v1/invoices/generate-img/`,
            "$invoiceID",
          ],
        },
        pdfDownloadLink: {
          $concat: [
            `${envCaptured.baseURL}/v1/invoices/generate-pdf/`,
            "$invoiceID",
          ],
        },
        _id: false,
      },
    },
  ]);
};

export const invoiceView = async (invoiceID, png) => {
  const invoiceData = await Product.find({ invoiceID });
  if (!invoiceData.length) return null;
  const html = htmlGen(invoiceData[0]);
  return await generateBill(html, png);
};

const generateBill = async (html, png) => {
  const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    }),
    page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const bufferedData = png
    ? await page.screenshot({
        type: "png",
        fullPage: true,
      })
    : await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "20mm",
          right: "10mm",
          bottom: "20mm",
          left: "10mm",
        },
      });
  await browser.close();
  return bufferedData;
};

const storeInvoice = async (invoiceData) => {
  await Product.create({
    ...invoiceData,
    invoiceID: uuid(),
  });
};

const htmlGen = (invoiceData) => {
  const {
    products,
    name,
    email,
    invoiceDate,
    total,
    gst,
    grandTotal,
    expiryDate,
  } = invoiceData;
  return `
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; }
        .header { text-align: center; font-size: 24px; margin-bottom: 20px; }
        .company-info, .customer-info { width: 50%; float: left; }
        .company-info { text-align: left; }
        .customer-info { text-align: right; }
        .invoice-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 8px; }
        .invoice-table th { background-color: #f4f4f4; }
        .footer { clear: both; margin-top: 80px; }
        .terms { background-color: black; color: white; border-radius: 60px; padding: 10px 80px; margin-top: 120px; }
        .date-section{text-align:right;}
        .final-amount{color: blue;}
      </style>
    </head>
    <body>
      <div class="header"><strong>Tax Invoice</strong></div>
      <div class="date-section"><strong>Invoice Date:</strong> ${invoiceDate}</div>
      <div class="company-info">
        <p><strong>Sold by:</strong> MoneeFlo Technologies Pvt. Ltd.</p>
        <p><strong>Address:</strong> Bhikaji Cama Place, Delhi
</p>
        <p><strong>GST Number:</strong> 07ABMCT1234P1Z4</p>
        <p><strong>CIN:</strong> U67100HR2022PTC100766</p>
      </div>
      <div class="customer-info">
        <p><strong>Sold to:</strong> ${name}</p>
        <p><strong>email:</strong> ${email}</p>
      </div>
      <table class="invoice-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${products
            .map(
              (product) => `
            <tr>
              <td>${product.name}</td>
              <td>${product.qty}</td>
              <td>${product.rate}</td>
              <td>INR ${amountInINR(
                (product.qty * product.rate).toFixed(0)
              )}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
        <tbody>
          <tr>
            <td colspan="3" style="text-align: right;"><strong>Total</strong></td>
            <td>INR ${amountInINR(total)}</td>
          </tr>
          <tr>
            <td colspan="3" style="text-align: right;">GST @ 18%</td>
            <td>INR ${amountInINR(gst)}</td>
          </tr>
          <tr>
            <td colspan="3" style="text-align: right;"><strong>Grand Total</strong></td>
            <td class="final-amount"><strong>&#8377; ${amountInINR(
              grandTotal
            )}</strong></td>
          </tr>
        </tbody>
      </table>
      <div class="footer">
        <p class="valid-until"><strong>Valid until:</strong> ${expiryDate}</p>
        <div class="terms">
          <p>Terms and Conditions: We are happy to supply any further information you may need and trust that you call on us to fill your order. Which will receive our prompt and careful attention.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
