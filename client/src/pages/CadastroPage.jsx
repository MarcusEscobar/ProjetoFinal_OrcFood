import React, { useContext, useState } from "react";
import { createUser } from "../services/api";
import { AuthContext } from "../contexts/auth";

function CadastroPage() {
    const {login} = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [endereco, setEndereco]= useState("")

    const handleCadastro = async (e)=>{
        e.preventDefault()
        if(email && password && name && endereco){
           const response = await createUser(name, endereco, email, password)      
            if(response.status===201){
                login(email,password)
            }
           

        }
    }



    return ( 
    <div className="cadastro">
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

            <div className="field">
                <label htmlFor="name">Nome:</label>
                <input  
                    name="name" 
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
            </div>

            <div className="field">
                <label htmlFor="endereco">Endereço:</label>
                <input  
                    name="endereco" 
                    id="endereco"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    />
            </div>
            <button type="submit" onClick={(e)=>{handleCadastro(e)}} >Cadastrar</button>

        </form>
    </div>
    );
}

export default CadastroPage;