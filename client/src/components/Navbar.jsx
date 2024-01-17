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
        <h1>OrcFood</h1>
        <ul>
            {/* <li><Link to="/" className="li">Home</Link></li> */}
            {/* <li><Link to="/login" className="li">Login</Link></li> */}
            <li>Olá {user.name}</li>
            <li><button type="button" onClick={handleLogout}>Logout</button></li>
        </ul>
    </nav>
  )
}

export default Navbar