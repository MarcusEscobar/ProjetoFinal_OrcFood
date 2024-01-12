import mongoose from "mongoose";

const { itemSchema } = require("./Item");

const cardapioSchema = new mongoose.Schema(
    {
        itens: {
            type: [itemSchema]
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Cardapio', cardapioSchema);

module.exports = Cardapio;