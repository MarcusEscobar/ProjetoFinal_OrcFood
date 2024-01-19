import { useContext, useState } from "react";
import CartItem from "../CartItem/CartItem";
import formatCurrency from "../../../utils/formatCurrency";

import "./Cart.css";
import AppContext from "../../contexts/AppContext";

function Cart() {
  const { cartItems, isCartVisible } = useContext(AppContext);



  const totalPrice = cartItems.reduce((acc, item) => {
    return parseFloat(item.price) + acc;
  }, 0.0);

  const handleFinalizarCompra = ()=>{

      console.log(cartItems)
  }


  return (
    <section className={`cart ${isCartVisible ? "cart--active" : ""}`}>
      
      {cartItems.length === 0 && (
        <span>Carrinho vazio</span>
      )}

      <div className="cart-items">
        {cartItems.map((cartItem, index) => (
          <CartItem key={cartItem._id+index} data={cartItem} index={ index } />
        ))}
      </div>

      <div className="cart-resume">{formatCurrency(totalPrice, "BRL")} </div>
      <button onClick={handleFinalizarCompra}>finalizar</button>
  
    </section>
  );
}

export default Cart;
