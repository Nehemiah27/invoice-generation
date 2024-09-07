import mongoose from "mongoose";

const productType = {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    qty: {
      type: Number,
      required: true,
      trim: true,
    },
    rate: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  productsSchema = new mongoose.Schema(
    {
      products: [productType],
      userID: {
        type: String,
        required: true,
        trim: true,
      },
      invoiceID: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      invoiceDate: {
        type: String,
        required: true,
      },
      expiryDate: {
        type: String,
        required: true,
      },
      gst: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      grandTotal: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  ),
  Product = mongoose.model("Product", productsSchema);

export default Product;
