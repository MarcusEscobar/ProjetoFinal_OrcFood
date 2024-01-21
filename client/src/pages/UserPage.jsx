import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import "../styles/UserPage.css";
import PedidosPage from "./PedidosPage";
import { useNavigate } from "react-router-dom";

function UserPage() {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    console.log(user)
    const c10 = parseInt(localStorage.getItem('c10'))
    const c20 = parseInt(localStorage.getItem('c20'))
    const c30 = parseInt(localStorage.getItem('c30'))
    const moedas = parseInt(localStorage.getItem('moedas'))
    const tickets = parseInt(localStorage.getItem('tickets')
)


    return ( 
        <div className="containerUser" >
            <div className="bntAcessos">
                <button className="btnPerfil" onClick={()=>{navigate('/roleta')}}>Acessar roleta</button>
                <button className="btnPerfil" onClick={()=>{navigate('/cupons')}}>Comprar cupons</button>
                <button className="btnPerfil" onClick={()=>{navigate('/edit')}}>Editar perfil</button>
                <button className="btnPerfil">Excluir Perfil</button>
            </div>
            <div>
                <div className="userInfo" >
                    <p>Nome:{user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Endereço: {user.endereco}</p> 
                </div>               
                <div className="economyInfo">
                    <p>Quantidade de Cupons 10% de desconto:  {c10}</p>
                    <p>Quantidade de Cupons 20% de desconto: {c20} </p>
                    <p>Quantidade de Cupons 30% de desconto: {c30} </p>
                    <p>Quantidade de moedas: {moedas}</p>
                    <p>Quantidade de tickets: {tickets}</p>
                </div>
            </div>
            

            <div className="containerPedidosUser">
                <PedidosPage/>
            </div>
            
                
            
        </div>
     );
}

export default UserPage;