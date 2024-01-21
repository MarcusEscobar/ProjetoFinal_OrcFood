import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { createPedido, updateUserEconomy } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";

import CartItem from "../CartItem/CartItem";
import formatCurrency from "../../../utils/formatCurrency";
import AppContext from "../../contexts/AppContext";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";

function Cart() {
  const { cartItems, isCartVisible, setCartItems } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  const [cupom, setCupom] = useState(0);

  const c10 = parseInt(localStorage.getItem("c10"));
  const c20 = parseInt(localStorage.getItem("c20"));
  const c30 = parseInt(localStorage.getItem("c30"));
  const ticket = parseInt(localStorage.getItem("tickets"))

  const totalPrice = cartItems.reduce((acc, item) => {
    return parseFloat(item.item.price * item.quatidade) + acc;
  }, 0.0);

  const priceDesconto = totalPrice - totalPrice * (cupom / 100);

  const removerCupom = async () => {
    localStorage.setItem("tickets", ticket+1);
    if(parseInt(cupom) === 0){
      const response = await updateUserEconomy(
        user.id,
        user.moedas,
        ticket+1,
        user.cupons.c10,
        user.cupons.c20,
        user.cupons.c30
      );
    }
    if (parseInt(cupom) === 10) {
      const newC10 = c10 - 1;
      const response = await updateUserEconomy(
        user.id,
        user.moedas,
        user.tickets+1,
        newC10,
        user.cupons.c20,
        user.cupons.c30
      );
      localStorage.setItem("c10", newC10);
      
    }
    if (cupom === 20) {
      const newC20 = c20 - 1;
      const response = await updateUserEconomy(
        user.id,
        user.moedas,
        user.tickets+1,
        user.cupons.c10,
        newC20,
        user.cupons.c30
      );
      localStorage.setItem("c20", newC20);
      
    }
    if (cupom === 30) {
      const newC30 = c30 - 1;
      const response = await updateUserEconomy(
        user.id,
        user.moedas,
        user.tickets+1,
        user.cupons.c10,
        user.cupons.c20,
        newC30
      );
      localStorage.setItem("c30", newC30);
      
    }
  };

  const handleFinalizarCompra = async () => {
    if (cartItems.length === 0) {
      toast.error("Carrinho vazio", { position: "bottom-center" });
    } else {
      toast.success("Pedido finalizado", { position: "bottom-center" });
      toast.success("Você ganhou 1 Ticket", { position: "bottom-center" });
      await createPedido(user.id, user, cartItems, "Pendente");
      localStorage.setItem("cartItems", JSON.stringify({ cartItems: [] }));
      setCartItems([]);
      removerCupom();
      setCupom(0);
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
      {cartItems.length === 0 ? (
        <span className="spanCarrinho">Carrinho vazio</span>
      ) : (
        <button onClick={handleLimparCarrinho} className="buttonsCarrinho">
          Limpar carrinho
        </button>
      )}

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

      <div className="cart-resume">
        <div className="containerSelectDesconto">
          <label htmlFor="selectDesconto" className="labelDesconto">
            Desconto:
          </label>
          <select
            id="selectDesconto"
            name="selectDesconto"
            defaultValue={cupom}
            onChange={(e) => {
              setCupom(e.target.value);
            }}
          >
            <option value={0}>sem desconto</option>
            {c10 && <option value={10}>10% de desconto</option>}
            {c20 && <option value={20}>20% de desconto</option>}
            {c30 && <option value={30}>30% de desconto</option>}
          </select>
        </div>
        {formatCurrency(priceDesconto, "BRL")}{" "}
      </div>
      <button onClick={handleFinalizarCompra} className="buttonsCarrinho">
        finalizar
      </button>
    </section>
  );
}

export default Cart;
