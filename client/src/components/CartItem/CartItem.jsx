import { BsCartDashFill } from "react-icons/bs";
import { useContext } from "react";

import propTypes from "prop-types";
import formatCurrency from "../../../utils/formatCurrency";
import AppContext from "../../contexts/AppContext";
import "./CartItem.css";

function CartItem({ data, q, index }) {
  const { cartItems, setCartItems } = useContext(AppContext);
  const { _id, name, price, image } = data;



  const handleRemoveItem = () => {
    if(q ===1 ){
      const updatedItems = cartItems.filter((item, indexItem) => indexItem !== index);
  
      localStorage.setItem('cartItems', JSON.stringify({cartItems:updatedItems}))
      setCartItems(updatedItems);
      
    }else{
      const newProduct = {item: data, quatidade: q-1}
      let newArray = [...cartItems]
      newArray[index] = newProduct
      setCartItems(newArray);
      localStorage.setItem("cartItems", JSON.stringify({ cartItems: newArray }));

    }
    
    

  };

  return (
    <section className="cart-item">
      
        
        <img
          src={image}
          alt="imagem do produto"
          className="cart-item-image"
        />
       
      <div className="cart-item-content">
        <h3 className="cart-item-title">{name} x{q}</h3>
        <h3 className="cart-item-price">{formatCurrency(parseFloat(price), "BRL")}</h3>

        <button
          type="button"
          className="button__remove-item"
          onClick={handleRemoveItem}
        >
          <BsCartDashFill />
        </button>
      </div>
    </section>
  );
}

export default CartItem;

CartItem.propTypes = {
  data: propTypes.object,
}.isRequired;
