import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { getItens, destroyItem } from "../services/api";

import Search from "../components/Search/Search";
import Cardapio from "../components/Cardapio/Cardapio";
import Navbar from "../components/Navbar/Navbar";
import Cart from "../components/Cart/Cart";
import "../App.css";
// import { createItem } from "../services/api";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  const [cardapio, setCardapio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const loadData = async (query = "") => {
    try {
      setLoading(true);
      const response = await getItens(query);
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

  const handleSearch = (query) => {
    loadData(query);
  };

  const handleDeleteItem = async (item) => {
    if (user === "adm") {
      await destroyItem(item._id);
      await loadData();
    }
    await destroyItem(item._id);
    await loadData();
  };
  if (loadingError) {
    return <div className="loading">Erro ao carregar o cardápio.</div>;
  }

  if (loading) {
    return <div className="loading">Carregando cardápio...</div>;
  }

  return (
    <div className="homepage">
      <Navbar />
      <div className="main_container">
        <picture className="banner_container">
          <img src="src\img\banner.png" alt="banner" />
        </picture>
        <Search onSearch={handleSearch} />
        <Cardapio
          cardapio={cardapio}
          onLoadData={loadData}
          onDeleteItem={handleDeleteItem}
        />
      </div>
      <Cart />
    </div>
  );
};

export default HomePage;
