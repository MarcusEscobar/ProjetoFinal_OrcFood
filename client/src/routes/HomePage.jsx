import React, {useContext} from "react";
import { AuthContext } from "../contexts/auth";



import Search from "../components/Search";
import Cardapio from "../components/Cardapio";
import Carrinho from "../components/Carrinho";
import Navbar from "../components/Navbar";
// import { createItem } from "../services/api";

const HomePage = () => {
  
  const {authenticated, user} = useContext(AuthContext)

  const handleLogout = () => {
    console.log('logout');
  }
  

  const handleSearch = (query) => {
    console.log("query", query);
    LoadData(query);
  };

  // const atualizedPrice = item.price;

  const handleAddItemCarrinho = (item) => {
    console.log("+1", item_id);
    // atualizedPrice += item.price;
  };

  const handleRemoveItemCarrinho = (item) => {
    console.log("-1", item_id);
    // atualizedPrice -= item.price; 
  };

  return (
    <div className="homepage">
      <Navbar />
      <Search onSearch={handleSearch} />
      <Cardapio />
      <Carrinho onSearch={handleSearch} onAddItemCarrinho={handleAddItemCarrinho} onRemoveItemCarrinho={handleRemoveItemCarrinho} />
    </div>
  );
};

export default HomePage;