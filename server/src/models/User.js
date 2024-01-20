import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    endereco: {
      type: String,
      // required: true
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    password: {
      type: String,
      required: true,
    },
    scope: {
      type: String,
      required: true,
    },
    moedas: {
      type: Number,
      required: true,
    },
    tickets: {
      type: Number,
      required: true,
    },
    cupons: {
        type: Object,
        required: true,
        c10: {
            type: Number,
            required: true,
        },
        c20: {
            type: Number,
            required: true,
        },
        c30: {
            type: Number,
            required: true,
        },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
