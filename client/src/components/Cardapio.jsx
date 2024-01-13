import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/components/Cardapio.css";

import { getItens } from "../services/api";

const Cardapio = ({ onNewItem, onDeleteItem }) => {
  const [cardapio, setCardapio] = useState([]);
  const loadData = async (query = "") => {
    const response = await getItens();

    setCardapio(response.data);
  };

  useEffect(() => {
    (async () => await loadData())();
  }, []);

  const [newItem, setNewItem] = useState("");

  return (
    <div className="cardapio">
      <div className="cardapio_title">
        <h2>Cardápio</h2>
        <Link to="/newitem" className="btn_newitem">
          Adicionar item
        </Link>
      </div>

      <ul>
        {cardapio.map((item) => {
          return (
            <li className="item" key={item.id}>
              <picture>
                <img src="#" alt="#" />
              </picture>
              <h3 className="item_name">{item.name}</h3>
              <button onClick={() => onDeleteItem(item.id)}>Apagar</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cardapio;
