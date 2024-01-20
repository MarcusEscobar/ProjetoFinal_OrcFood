import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NovoItemPage from "./pages/NovoItemPage.jsx";
import CadastroPage from "./pages/CadastroPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import ItemPage from "./pages/ItemPage.jsx";
import RoletaPage from "./pages/RoletaPage.jsx";
import CuponsPage from "./pages/CuponsPage.jsx";

import { AuthContext, AuthProvider } from './contexts/auth.jsx' 
import { useContext } from "react";
import Provider from "./contexts/Provider.jsx";


function AppRoutes() {

    const Private = ({children})=>{
        const { authenticated, loading } = useContext(AuthContext)
        
        if(loading){
            return <div className="loading" >Carregando...</div>
        }

        if(!authenticated){
            return <Navigate to="/login"/>
        }

        return children
    }
    const PrivateAdmin = ({children})=>{
        const { authenticated, loading, user } = useContext(AuthContext)
        
        if(loading){
            return <div className="loading" >Carregando...</div>
        }

        if(!authenticated){
            return <Navigate to="/login"/>
        }

        if(user.scope !== "adm"){
            return <Navigate to="/"/>
        }

        return children
    }

    return(
        <BrowserRouter>
            <Provider>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Private><HomePage/></Private>}></Route>
                        <Route path="/login" element={<LoginPage/>}></Route>
                        <Route path="/cadastro" element={<CadastroPage/>} ></Route>
                        <Route path="/newitem" element={<PrivateAdmin><NovoItemPage/></PrivateAdmin>}></Route>
                        <Route path="/search" element={<SearchPage/>}></Route>
                        <Route path="/cardapio/:id" element={<Private><ItemPage /></Private>}></Route>
                        <Route path="/roleta" element={<Private><RoletaPage /></Private>}></Route>
                        <Route path="/cupons" element={<Private><CuponsPage /></Private>}></Route>
                    </Routes>
                </AuthProvider>
            </Provider>
        </BrowserRouter>

    )
    
}

export default AppRoutes