import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/components/Cardapio.css";

import { getItens } from "../services/api";

const Cardapio = ({ onNewItem, onDeleteItem, query }) => {
  const [cardapio, setCardapio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const loadData = async (query = "") => {
    try {
      setLoading(true);
      const response = await getItens();
      setCardapio(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoadingError(true);
    }
  };

  useEffect(() => {
    (async () => await loadData())();
  }, []);

  const [newItem, setNewItem] = useState("");

  // const handleNewItem = async (name, description, price, image, category, serve) => {
  //   console.log("new item");
  //   try {
  //     await createItem(name, description, price, image, category, serve);
  //     await loadData();
  //   } catch (err) {
  //     console.error(err);
  //     setLoadingError(true);
  //   }
  // };

  if (loadingError) {
    return (
      <div className="loading">
        Erro ao carregar o cardápio.
      </div>
    )
  }

  if (loading) {
    return (
      <div className="loading">
        Carregando cardápio...
      </div>
    )
  }

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
            <li className="item" key={item._id}>
              <picture>
                <img src="#" alt="#" />
              </picture>
              <h3 className="item_name">{item.name}</h3>
              <button onClick={() => onDeleteItem(item)}>Apagar</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cardapio;
