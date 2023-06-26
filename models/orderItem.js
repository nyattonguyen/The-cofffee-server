import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
  quanlity: {
    type: Number,
    require: "true",
  },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);
export default OrderItem;
