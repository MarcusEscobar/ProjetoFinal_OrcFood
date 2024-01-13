import React from 'react';
import { Link } from "react-router-dom";

import "../styles/components/Navbar.css"

const Navbar = () => {
  const handleLogout = () => {
    console.log('logout');
  }

  return (
    <nav>
        <h1>Nome</h1>
        <ul>
            <li><Link to="/" className="li">Home</Link></li>
            <li><Link to="/login" className="li">Login</Link></li>
            <li><button type="button" onClick={handleLogout}>Logout</button></li>
        </ul>
    </nav>
  )
}

export default Navbar