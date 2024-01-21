import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { getPedidoCliente, getPedidos } from "../services/api";
import { AuthContext } from "../contexts/auth";

import Pedido from "../components/Pedido/Pedido";
import Navbar from "../components/Navbar/Navbar";

function PedidosPage() {
  const { user } = useContext(AuthContext);

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPedidos = async () => {
    try {
      setLoading(true);
      if (user.scope === "adm") {
        const response = await getPedidos();
        setPedidos(response.data);
        setLoading(false);
      } else {
        const response = await getPedidoCliente(user.id);
        setPedidos(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

    useEffect(() => {
        (async ()=>{await loadPedidos()})()
    }, []);
    return ( 
        <div className="containerPedidos">
            <Navbar pedidos={true}/>
            <table className="tablePedidos"> 
                <tbody>
                    <tr>
                        <th><p>Cliente</p></th>
                        <th><p>Pedido</p></th>
                        <th><p>Status</p></th>
                    </tr>
                    {pedidos.map((pedido, index) => (
                        <Pedido 
                            key={pedido._id}

                            item={pedido} 

                            index = {index}
                        />
                    ))}
                </tbody>
            </table>
        </div>
     );
}

export default PedidosPage;
