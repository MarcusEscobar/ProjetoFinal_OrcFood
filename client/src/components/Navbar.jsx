import React, { useContext } from 'react';
import { Link } from "react-router-dom";

import "../styles/components/Navbar.css"
import { AuthContext } from '../contexts/auth';
import CartButton from './Cartbutton/CartButton';

const Navbar = () => {

  const { user, logout} = useContext(AuthContext)


  

  const handleLogout = () => {
    console.log('logout');
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