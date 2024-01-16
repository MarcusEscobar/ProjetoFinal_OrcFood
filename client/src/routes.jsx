import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import HomePage from "./routes/HomePage.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import NovoItemPage from "./routes/NovoItemPage.jsx";

import { AuthContext, AuthProvider } from './contexts/auth.jsx' 
import { useContext } from "react";


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
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Private><HomePage/></Private>}></Route>
                    <Route path="/login" element={<LoginPage/>}></Route>
                    <Route path="/newitem" element={<PrivateAdmin><NovoItemPage/></PrivateAdmin>}></Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>

    )
    
}

export default AppRoutes