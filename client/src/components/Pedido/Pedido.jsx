import React, { useContext, useState } from "react";
import { updatePedido } from "../../services/api";
import { AuthContext } from "../../contexts/auth";

import "./Pedido.css";

function Pedido(item, index) {
  const { _id, idCliente, cliente, pedidos, status } = item.item;
  const { user } = useContext(AuthContext);

  const [edit, setEdit] = useState(false);
  const [newStatus, setNewStatus] = useState(status);

  const handleEditStatus = async () => {
    const response = await updatePedido(
      _id,
      idCliente,
      cliente,
      pedidos,
      newStatus
    );
    setEdit(!edit);
  };

  const handleCancelPedido = async () => {
    const response = await updatePedido(
      _id,
      idCliente,
      cliente,
      pedidos,
      "Cancelado"
    );
    setNewStatus("Cancelado");
  };

  return (
    <tr>
      <td>
        <div className="insideTd">{cliente.name}</div>
      </td>
      <td>
        <div className="listaPedidos">
          {pedidos.map((e, index) => {
            return (
              <p key={index}>
                {e.quatidade}x {e.item.name}
              </p>
            );
          })}
        </div>
      </td>
      <td>
        <div className="insideTd">
          {!edit ? (
            <>
              {user.scope === "adm" ? (
                <>
                  {newStatus}
                  <button
                    onClick={() => {
                      setEdit(!edit);
                    }}
                    className="btnPedidos"
                  >
                    editar
                  </button>
                </>
              ) : (
                <>
                  {newStatus}
                  <button onClick={handleCancelPedido} className="btnPedidos">
                    Cancelar
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <select
                defaultValue={status}
                onChange={(e) => {
                  setNewStatus(e.target.value);
                }}
              >
                <option value={"Pendente"}>Pendente</option>
                <option value={"Em andamento"}>Em andamento</option>
                <option value={"Concluido"}>Concluido</option>
              </select>
              <button onClick={handleEditStatus} className="btnPedidos">
                enviar
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default Pedido;
