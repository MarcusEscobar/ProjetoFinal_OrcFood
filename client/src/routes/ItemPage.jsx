import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getItem } from "../services/api";

const ItemPage = () => {
    const [item, setItem] = useState([]);

  const loadData = async (id) => {
    try {
      const response = await getItem(id);
      setItem(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    (async () => await loadData())();
  }, []);

  console.log(item);

  return (
    <div className="itemPage">
      <Link to="/">Voltar</Link>
      <h1>{item.name}</h1>
      <div>
        <p>{item.description}</p>
        <p>R${item.price}.</p>
        <picture>
          <img src={item.image} alt="#" />
        </picture>
        <p>{item.category}</p>
        <p>Serve: {item.serve} pessoas.</p>
      </div>
    </div>
  );
};

export default ItemPage;
