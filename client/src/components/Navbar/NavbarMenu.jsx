import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NavbarMenu = ({ user, onLogout }) => {

  return (
    <div className='menu_hamburguer'>
        <Link to={'/'} className='link'>Cardápio</Link>
        {user.scope === "adm" && <Link to={'/pedidos'} className='link'>Pedidos</Link>}
        <Link to={'/user'} className='link'>Meu perfil</Link>
        <button type="button" onClick={onLogout} className='link'>Logout</button>
    </div>
  )
}

export default NavbarMenu