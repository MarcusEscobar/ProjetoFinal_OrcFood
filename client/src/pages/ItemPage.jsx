import React, { useState, useEffect } from "react";
import { getItem } from "../services/api";

import Navbar from "../components/Navbar";

const ItemPage = () => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const itemId = window.location.href.substring(31);
  
  // console.log(itemId);

  const loadData = async () => {
    try {
      const response = await getItem(itemId);
      // console.log(itemId);
      // console.log(response.data);

      for (let i = 0; i < response.data.length; i++) {
        // console.log(response.data[i]);
        if (itemId === response.data[i]._id) {
          setItem(response.data[i]);
        }
      }
      // console.log(item);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoadingError(true);
    }
  };

  useEffect(() => {
    (async () => loadData())();
  }, []);

  //console.log(item);

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
        Carregando página...
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <p>{item.name}</p>
      <p>Categoria: {item.category}</p>
      <p>{item.description}</p>
      <picture>
        <img src={item.image} alt={item.name} />
      </picture>
      <p>Preço: R${item.price}</p>
      <p>Serve: {item.serve} pessoa(s).</p>
    </div>
  );
};

export default ItemPage;
