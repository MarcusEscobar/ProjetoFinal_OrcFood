import { useContext, useState } from "react";
import { AuthContext } from "../contexts/auth";
import { updateUser } from "../services/api";
import '../styles/EditUserPage.css'
import Navbar from "../components/Navbar";

function EditUserPage() {
    const {user, login, logout } = useContext(AuthContext)
    console.log(user)

    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [name, setName] = useState(user.name);
    const [endereco, setEndereco] = useState(user.endereco);

    const handleEdit = async(e)=>{
        e.preventDefault();
        const  response =  await updateUser(
                user.id, 
                name, 
                endereco, 
                email, 
                password, 
                user.scope ,
                user.moedas, 
                user.tickets, 
                user.cupons.c10, 
                user.cupons.c20, 
                user.cupons.c30)
            console.log(response)
            logout()
            login(email, password)

    }

    return ( 
        <div className="edit_page">
        <Navbar/>
        <form>
            <div className="field">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>

            <div className="field">
            <label htmlFor="password">Senha</label>
            <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>

            <div className="field">
            <label htmlFor="name">Nome</label>
            <input
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </div>

            <div className="field">
            <label htmlFor="endereco">Endereço</label>
            <input
                name="endereco"
                id="endereco"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
            />
            </div>

            <div className="actions">
            <button 
                type="submit" 
                onClick={(e)=>{handleEdit(e)}} 
                className="btn-edit"
                >Editar</button>
                
            </div>
        </form>

        
    </div>

    );
}

export default EditUserPage;