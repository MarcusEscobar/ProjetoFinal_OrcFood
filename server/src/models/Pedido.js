import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema(
  {
    cliente: {
      type: Object,
      required: true,
      index: {
        unique: true,
      },
    },
    pedidos: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Pedido", PedidoSchema);
