import React, {useState} from "react";

import Search from "../components/Search";
import Cardapio from "../components/Cardapio";
import Carrinho from "../components/Carrinho";
// import { createItem } from "../services/api";

const HomePage = () => {

  const handleLogout = () => {
    console.log('logout');
  }
  

  const handleSearch = (query) => {
    console.log("query", query);
  };

  const handleDeleteItem = () => {
    console.log("Item deleted.");
  };

  // const handleNewItem = async (name, description, price, image, category, serve) => {
  //   console.log("new item");
  //   try {
  //     await createItem(name, description, price, image, category, serve);
  //     await loadData
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
      <Search onSearch={handleSearch} />
      <Cardapio onDeleteItem={handleDeleteItem} />
      <Carrinho onAddItemCarrinho={handleAddItemCarrinho} onRemoveItemCarrinho={handleRemoveItemCarrinho} />
    </div>
  );
};

export default HomePage;