import { AiOutlineShoppingCart } from "react-icons/ai";
import { useContext, useState } from "react";

import AppContext from "../../contexts/AppContext";
import "./CartButton.css";
import { useEffect } from "react";

function CartButton() {
  const { cartItems, isCartVisible, setIsCartVisible } = useContext(AppContext);



  const quantidadeItens = ()=>{
    let quantidade =0
    cartItems.map((e)=>{
      quantidade+=e.quatidade
    })
    return quantidade
  }



  return (
    <button
      type="button"
      className="cart__button"
      onClick={() => {
        setIsCartVisible(!isCartVisible);
      }}
    >
      <AiOutlineShoppingCart />

      {cartItems.length > 0 && (
        <span className="cart-status">{quantidadeItens()}</span>
        )}
    </button>
  );
}

export default CartButton;
