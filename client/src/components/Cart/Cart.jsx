import { useContext, useState } from "react";
import CartItem from "../CartItem/CartItem";
import formatCurrency from "../../../utils/formatCurrency";

import "./Cart.css";
import AppContext from "../../contexts/AppContext";
import { AuthContext } from "../../contexts/auth";
import { createPedido } from "../../services/api";

function Cart() {
  const { cartItems, isCartVisible, setCartItems } = useContext(AppContext);

  const { user } = useContext(AuthContext);

  const totalPrice = cartItems.reduce((acc, item) => {
    return parseFloat(item.item.price * item.quatidade) + acc;
  }, 0.0);

  const handleFinalizarCompra = async () => {
    const response = await createPedido(user, cartItems, "Pendente");
    console.log(response);
    localStorage.setItem("cartItems", JSON.stringify({ cartItems: [] }));
    setCartItems([]);
  };

  const handleLimparCarrinho = () => {
    localStorage.setItem("cartItems", JSON.stringify({ cartItems: [] }));
    setCartItems([]);
  };

  return (
    <section className={`cart ${isCartVisible ? "cart--active" : ""}`}>
      {cartItems.length === 0 && <span>Carrinho vazio</span>}

      <div className="cart-items">
        {cartItems.map((cartItem, index) => (
          <CartItem
          key={cartItem.item._id + index}
          data={cartItem.item}
          q={cartItem.quatidade}
          index={index}
          />
          ))}
      </div>

      <button onClick={handleLimparCarrinho}>Limpar carrinho</button>
      <div className="cart-resume">{formatCurrency(totalPrice, "BRL")} </div>
      <button onClick={handleFinalizarCompra}>finalizar</button>
    </section>
  );
}

export default Cart;
