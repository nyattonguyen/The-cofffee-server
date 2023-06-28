import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      require: true,
      // public_id: {
      //   type: String,
      //   required: true,
      // },
      // url: {
      //   type: String,
      //   required: true,
      // },
    },
    price: {
      type: Number,
      require: true,
    },
    stick: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sizes: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
    extraOptions: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
    // Stock: {
    //   type: Number,
    //   default: 1,
    //   maxLength: 5,
    // }, //
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
