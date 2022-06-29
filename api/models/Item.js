const { Schema, model } = require("mongoose");

/* This is creating a new schema for the Items model. */
const ItemSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please provide title"],
    },
    status: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: [true, "Please provide a item price"],
    },
    desc: {
      type: String,
      required: [true, "Please provide item description"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Item", ItemSchema);
