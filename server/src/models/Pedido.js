import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema(
  {
    idCliente:{
      type: String,
      require: true
    },
    cliente: {
      type: Object,
      required: true,
    },
    pedidos: {
      type: Object,
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
