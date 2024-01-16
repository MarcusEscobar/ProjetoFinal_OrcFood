import React, { useContext, useState } from 'react';
import "../styles/LoginPage.css";

import { AuthContext } from '../contexts/auth';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate()
    const {authenticated, user, login} = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = async() => {
        login(email, password)
    }

  return (
    <div className="login">
        <form>
            <div className="field">
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
            </div>

            <div className="field">
                <label htmlFor="password">Senha:</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
            </div>

            <div className="actions">
                <button type="button" onClick={handleLogin}>Entrar</button>
            </div>
            <button onClick={()=>{navigate("/cadastro")}}>Cadastro</button>
        </form>
    </div>
  )
}

export default LoginPage