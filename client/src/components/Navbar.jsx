import React, { useContext } from 'react';
import { Link } from "react-router-dom";

import "../styles/components/Navbar.css"
import { AuthContext } from '../contexts/auth';
import CartButton from './Cartbutton/CartButton';
import AppContext from '../contexts/AppContext';

const Navbar = () => {

  const { user, logout} = useContext(AuthContext)
  const { setCartItems } = useContext(AppContext)

  const handleLogout = () => {
    localStorage.setItem('cartItems', JSON.stringify({cartItems:[]}))
    setCartItems([])
    logout()
  }

  return (
    <header>
        <h1>OrcFood</h1>
        <ul>
            <CartButton/>
            <li>Olá {user.name}</li>
            <li><button type="button" onClick={handleLogout}>Logout</button></li>
        </ul>
    </header>
  )
}

export default Navbar