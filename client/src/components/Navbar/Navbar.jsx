import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

import CartButton from "../Cartbutton/CartButton";
import AppContext from "../../contexts/AppContext";
import "./Navbar.css";
import Cart from "../Cart/Cart";
import NavbarMenu from "./NavbarMenu";

import { FcMenu } from "react-icons/fc";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { setCartItems } = useContext(AppContext);

  const [menuActive, setMenuActive] = useState(false);

  const handleLogout = () => {
    localStorage.setItem("cartItems", JSON.stringify({ cartItems: [] }));
    setCartItems([]);
    logout();
  };

  const toggleMenuActive = () => {
    setMenuActive(!menuActive);
  }

  return (
    <div>

    <header>
      <a href="/">
        <img src="/src/img/Icone.png" alt="Icone" width="50" height="45" />
      </a>
      <h1>Afood</h1>
      <h2>
        Olá, <span onClick={()=>{navigate('/user')}} >{user.name}!</span>
      </h2>
      <ul>
        <CartButton className='icone_carrinho'/>
        <li>
          <button
          className="logout-btn"
          type="button"
          onClick={() => {
            navigate("/");
          }}>Cardápio</button>
        </li>
        <li>
          {user.scope ==="adm" &&
            <button
            className="logout-btn"
            type="button"
            onClick={() => {
              navigate("/pedidos");
            }}
          >
            Pedidos
          </button>
          }
        </li>
        <li>
          <button className="logout-btn" type="button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
      <FcMenu onClick={toggleMenuActive} className="icone_hamburguer"/>
      {menuActive ? <NavbarMenu user={user} onLogout={handleLogout} /> : <></>}
    </header>
    <Cart />
    </div>
  );
};

export default Navbar;
