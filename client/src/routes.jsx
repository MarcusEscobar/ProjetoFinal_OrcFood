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

    return(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Private><HomePage/></Private>}></Route>
                    <Route path="/login" element={<LoginPage/>}></Route>
                    <Route path="/newitem" element={<Private><NovoItemPage/></Private>}></Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>

    )
    
}

export default AppRoutes