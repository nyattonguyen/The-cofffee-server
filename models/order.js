import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
  ],
  address: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  totalPrice: {
    type: Number,
  },
  note: {
    type: String,
    default: "",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String,
    require: true,
  },
  hoursOder: {
    type: String,
    require: true,
  },
});

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;
