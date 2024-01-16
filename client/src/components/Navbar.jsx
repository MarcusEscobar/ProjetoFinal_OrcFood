import React, { useContext } from 'react';
import { Link } from "react-router-dom";

import "../styles/components/Navbar.css"
import { AuthContext } from '../contexts/auth';

const Navbar = () => {

  const { user, logout} = useContext(AuthContext)

  const handleLogout = () => {
    console.log('logout');
    logout()
  }

  return (
    <nav>
        <h1>Nome</h1>
        <ul>
            <li><Link to="/" className="li">Home</Link></li>
            <li><Link to="/login" className="li">Login</Link></li>
            <p>Olá {user.email}</p>
            <li><button type="button" onClick={handleLogout}>Logout</button></li>
        </ul>
    </nav>
  )
}

export default Navbar