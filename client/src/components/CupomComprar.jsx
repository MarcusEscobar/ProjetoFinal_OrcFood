import React from "react";
import "../styles/CuponsPage.css";

const CupomComprar = ({ desconto, onSale, preco, qtd, color, border }) => {
  return (
    <div className="cupomComprar">
      <div className="cupomHeader">
        <p>Cupom: {desconto}% de desconto.</p>
        <div
          className="cupomFigure"
          style={{ backgroundColor: `${color}`, border: `2px solid ${border}` }}
        >
          {desconto}%
        </div>
      </div>

      <p>Preço: ${preco}.</p>
      <p>Comprados: {qtd}</p>
      <button onClick={() => onSale(desconto)}>Comprar</button>
    </div>
  );
};

export default CupomComprar;
