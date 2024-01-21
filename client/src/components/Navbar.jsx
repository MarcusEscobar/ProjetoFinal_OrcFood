import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";

import "../styles/components/Navbar.css"
import { AuthContext } from '../contexts/auth';
import CartButton from './Cartbutton/CartButton';
import AppContext from '../contexts/AppContext';

const Navbar = (pedidos) => {
  const navigate = useNavigate()
  const { user, logout} = useContext(AuthContext)
  const { setCartItems } = useContext(AppContext)

  const handleLogout = () => {
    localStorage.setItem('cartItems', JSON.stringify({cartItems:[]}))
    setCartItems([])
    logout()
  }

  return (    
    <header>
      <a href="/">
        <img src="/src/img/Icone.png" alt="Icone" width="50" height="45"/>
      </a>
        <h1>Afood</h1>
        <h2>Olá, <span>{user.name}!</span></h2>
        <ul>
            <CartButton/>
            <li>
              {pedidos.pedidos? 
              <><button className='logout-btn' type="button" onClick={()=>{navigate('/')}}>Home</button></> 
              :<><button className='logout-btn' type="button" onClick={()=>{navigate('/pedidos')}}>Pedidos</button></>}
            </li>
            <li><button className='logout-btn' type="button" onClick={handleLogout}>Logout</button></li>
        </ul>
    </header>
  )
}

export default Navbar