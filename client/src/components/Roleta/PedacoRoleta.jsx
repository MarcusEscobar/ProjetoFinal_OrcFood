import React from "react";
import "./Roleta.css"

const PedacoRoleta = ({roletaValue}) => {
  return (
    <li className="pedacoRoleta">
      <div className="text">
        {roletaValue}
      </div>
    </li>
  );
};

export default PedacoRoleta;
