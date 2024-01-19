import { FaCartPlus } from "react-icons/fa";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import { BiDetail } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import formatCurrency from "../../../utils/formatCurrency";
import AppContext from "../../contexts/AppContext";
import propTypes from "prop-types";
import "./ProductCard.css";
function ProductCard({ item, deleteItem }) {
  let location = useLocation();

  const { name, price, image, _id } = item;
  const { user } = useContext(AuthContext);

  const { cartItems, setCartItems } = useContext(AppContext);

  const handleAddCart = () => {
    const itens = [...cartItems, item];
    setCartItems(itens);
    localStorage.setItem("cartItems", JSON.stringify({ cartItems: itens }));
  };

  return (
    <section className="product-card">
      {<img src={image} alt="product" className="card__image" />}
      <div className="card__infos">
        <h2 className="card__title">{name}</h2>
        <h2 className="card__price">
          {formatCurrency(parseFloat(price), "BRL")}
        </h2>
      </div>

      <button
        type="button"
        className="button__add-cart"
        onClick={handleAddCart}
      >
        <FaCartPlus />
      </button>

      <div className="product-options">
        <Link to={`/cardapio/${_id}`} className="product-icons">
          <BiDetail />
        </Link>

        {user.scope === "adm" ? (
          <div>
            <Link
              to="/newitem"
              state={{ item, edit: true }}
              className="product-icons"
            >
              <FaEdit />
            </Link>
            <button
              type="button"
              onClick={() => deleteItem(item)}
              className="product-icons"
            >
              <MdDeleteForever />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  item: propTypes.shape([]),
}.isRequired;
