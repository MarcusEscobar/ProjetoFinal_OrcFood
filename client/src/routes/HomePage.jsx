import React from 'react';

import Search from '../components/Search';
import Cardapio from '../components/Cardapio';

const HomePage = () => {
  const handleSearch = (query) => {
    console.log('query', query);
  };

  const handleDeleteItem = () => {
    console.log("Item deleted.");
  };

  const handleNewItem = ( name, description, price, image, category, serve ) => {
    console.log("new item");
  }

  return (
    <div className='homepage'>
      <Search onSearch={handleSearch} />
      <Cardapio onDeleteItem={handleDeleteItem} query={query}/>
    </div>
  )
}

export default HomePage