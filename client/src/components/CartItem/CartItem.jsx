import { BsCartDashFill } from "react-icons/bs";
import { useContext } from "react";

import propTypes from "prop-types";
import formatCurrency from "../../../utils/formatCurrency";
import AppContext from "../../contexts/AppContext";
import "./CartItem.css";

function CartItem({ data, index }) {
  const { cartItems, setCartItems } = useContext(AppContext);
  const { _id, name, price, image } = data;

  

  const handleRemoveItem = () => {
    
    const updatedItems = cartItems.filter((item, indexItem) => indexItem !== index);

    localStorage.setItem('cartItems', JSON.stringify({cartItems:updatedItems}))
    setCartItems(updatedItems);
    
    
    
   console.log(cartItems)
   console.log(data)


  };

  return (
    <section className="cart-item">
      
        
        <img
          src={image}
          alt="imagem do produto"
          className="cart-item-image"
          width="60" height="70"
        />
       
      <div className="cart-item-content">
        <h3 className="cart-item-title">{name}</h3>
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
