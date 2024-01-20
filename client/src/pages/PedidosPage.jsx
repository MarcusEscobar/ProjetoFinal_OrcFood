import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { getPedidoCliente, getPedidos } from "../services/api";
import { AuthContext } from "../contexts/auth";

function PedidosPage() {
    const {user} = useContext(AuthContext)
    const [pedidos,setPedidos] = useState(null)

    const loadPedidos = async ()=>{
        if(user.scope === "adm"){
            const response = await getPedidos()
            setPedidos(response.data)
        }else{
            const response = await getPedidoCliente(user.id)
            setPedidos(response.data)
        }
    }

    useEffect(() => {
        (async ()=>{await loadPedidos()})()
    }, []);

    return ( 
        <>
            pedidos
        </>
     );
}

export default PedidosPage;