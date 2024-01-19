import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import propTypes from "prop-types";

function Provider({ children }) {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    const itens = JSON.parse(localStorage.getItem('cartItems'))
    if(itens){
      setCartItems(itens.cartItems)
    }
    
  }, []);


  const value = {
    products,
    setProducts,
    loading,
    setLoading,
    cartItems,
    setCartItems,
    isCartVisible,
    setIsCartVisible,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default Provider;

Provider.propTypes = {
  children: propTypes.any,
}.isRequired;
