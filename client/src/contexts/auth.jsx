import React, {createContext, useEffect, useState} from "react";
import { api, createSession } from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(); 

export const AuthProvider = ({ children })=>{
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const user = localStorage.getItem('user')
        const token = localStorage.getItem('token')

        if(user && token){
            setUser(JSON.parse(user))
            api.defaults.headers.common.Authorization = `Bearer ${token}`
        }

        setLoading(false)
    },[])

    const login = async(email, password)=>{
       const response = await createSession(email, password)

       console.log(response.data)

       localStorage.setItem('user', JSON.stringify(response.data.user))
       localStorage.setItem('token', response.data.token)

       api.defaults.headers.common.Authorization  = `Bearer ${response.data.token}`

       setUser(response.data.user)

       navigate('/')
    }

    const logout = ()=>{
        localStorage.removeItem('user')
        localStorage.removeItem('token')

        api.defaults.headers.common.Authorization  = null

        setUser(null)

        navigate('/login')
    }

    return(
        <AuthContext.Provider 
            value={{
                authenticated: !!user,
                user,
                loading,
                login,
                logout   
            }}>{children}</AuthContext.Provider>
    )
}