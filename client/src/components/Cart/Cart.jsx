import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { createPedido } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";

import CartItem from "../CartItem/CartItem";
import formatCurrency from "../../../utils/formatCurrency";
import AppContext from "../../contexts/AppContext";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";

function Cart() {
  const { cartItems, isCartVisible, setCartItems } = useContext(AppContext);

  const { user } = useContext(AuthContext);

  const notify = () => {
    toast.error("Preencha todos os dados", { position: "bottom-center" });
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    return parseFloat(item.item.price * item.quatidade) + acc;
  }, 0.0);

  const handleFinalizarCompra = async () => {
    if (cartItems.length === 0) {
      toast.error("Carrinho vazio", { position: "bottom-center" });
    } else {
      toast.success("Pedido finalizado", { position: "bottom-center" });
      const response = await createPedido(user.id, user, cartItems, "Pendente");
      console.log(response);
      localStorage.setItem("cartItems", JSON.stringify({ cartItems: [] }));
      setCartItems([]);
    }
  };

  const handleLimparCarrinho = () => {
    toast.info("Carrinho limpado", { position: "bottom-center" });
    localStorage.setItem("cartItems", JSON.stringify({ cartItems: [] }));
    setCartItems([]);
  };

  return (
    <section className={`cart ${isCartVisible ? "cart--active" : ""}`}>
      <ToastContainer />
      {cartItems.length === 0  ?
        <span className="spanCarrinho" >Carrinho vazio</span> : 
        <button onClick={handleLimparCarrinho} className="buttonsCarrinho" >Limpar carrinho</button>}

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

      
      <div className="cart-resume">{formatCurrency(totalPrice, "BRL")} </div>
      <button onClick={handleFinalizarCompra} className="buttonsCarrinho">finalizar</button>
    </section>
  );
}

export default Cart;
