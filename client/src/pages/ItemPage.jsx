import React, { useState, useEffect } from "react";
import { getItem } from "../services/api";

import Navbar from "../components/Navbar/Navbar";

import "../App.css";
import "../styles/ItemPage.css";

const ItemPage = () => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const itemId = window.location.href.substring(31);


  const loadData = async () => {
    try {
      const response = await getItem(itemId);

      for (let i = 0; i < response.data.length; i++) {
        if (itemId === response.data[i]._id) {
          setItem(response.data[i]);
        }
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoadingError(true);
    }
  };

  useEffect(() => {
    (async () => loadData())();
  }, []);

  if (loadingError) {
    return <div className="loading">Erro ao carregar o cardápio.</div>;
  }

  if (loading) {
    return <div className="loading">Carregando página...</div>;
  }

  return (
    <div className="containerItemPage">
      <div className="item-page">
        <Navbar />
        <div className="main_container">
          <div className="detalhes-img">
            <picture>
              <img src={item.image} alt={item.name} className="imgItemPage" />
            </picture>
          </div>
          <h4>{item.name}</h4>
          <h6> {item.category}</h6>
          <p>Serve {item.serve} pessoa(s)</p>
          <p>{item.description}</p>
          <h5> R${item.price}</h5>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
