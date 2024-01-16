import React, { useContext, useState } from 'react';
import "../styles/LoginPage.css";
import { createSession } from '../services/api';
import { AuthContext } from '../contexts/auth';

const LoginPage = () => {
    const {authenticated, user, login} = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = async() => {
        console.log('email', email);
        console.log('password', password);
        
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
        </form>
    </div>
  )
}

export default LoginPage