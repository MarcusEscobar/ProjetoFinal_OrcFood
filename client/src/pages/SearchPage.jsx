import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { getItens } from "../services/api";

import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Cardapio from "../components/Cardapio/Cardapio";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const [itens, setItens] = useState([]);
  const query = searchParams.get("q");

  const loadData = async (url) => {
    const response = await
    setItens
  };

  useEffect(() => {
    const searchWithQueryURL = `${searchURL}&query=${query}`;

    loadData(searchWithQueryURL);
  }, []);

  return (
    <div className="homepage">
      <Navbar />
      <p>Teste</p>
      <Search />
      <h2>
        Resultados para: <span className="query_text">{query}</span>
      </h2>
      <Cardapio />
    </div>
  );
};

export default SearchPage;
