import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    image: [
      {
        type: String,
        require: true,
      },
    ],
    address: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const StoreModel = mongoose.model("Store", storeSchema);
export default StoreModel;
