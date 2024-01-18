import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

import "../styles/components/Search.css";

const Search = ({ onSearch }) => {

  const [query, setQuery] = useState("");
  // const navigate = useNavigate();

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="search">
      <label htmlFor="query">Pesquisar:</label>
      <input
        type="text"
        name="query"
        id="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="button" onClick={handleClear}>Limpar</button>
      <button type="button" onClick={() => onSearch(query)}>Procurar</button>
    </div>
  );
};

export default Search;
