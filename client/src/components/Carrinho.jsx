import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getItens } from "../services/api";

const Carrinho = ({ onRemoveItemCarrinho, onAddItemCarrinho }) => {
  const [cardapio, setCardapio] = useState([]);
  const loadData = async (query = "") => {
    const response = await getItens();

    setCardapio(response.data);
  };

  useEffect(() => {
    (async () => await loadData())();
  }, []);

  return (
    <div className="Carrinho">
      <ul>
        {cardapio.map((item) => {
                return (
                    <li className="item_carrinho" key={item._id}>
                        <picture>{item.image}</picture>
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <span>
                            <button onClick={() => onRemoveItemCarrinho(item)}>-</button>
                            <p>Qtd</p>
                            <button onClick={() => onAddItemCarrinho(item)}>+</button>
                        </span>
                        <Link>Detalhes</Link>
                    </li>
                )
            })}
      </ul>
    </div>
  );
};

export default Carrinho;
