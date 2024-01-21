import React from "react";
import "../styles/CuponsPage.css";

const CupomComprar = ({ desconto, onSale, preco, qtd, color, border }) => {
  return (
    <div className="cupom_comprar">
      <div className="cupomHeader">
        <p
          style={{ borderBottom: `1px solid ${border}`}}
        >Cupom: {desconto}% de desconto.</p>
        <div
          className="cupomFigure"
          style={{ backgroundColor: `${color}`, border: `2px solid ${border}` }}
        >
          {desconto}%
        </div>
      </div>

      <p>Preço: ${preco}</p>
      <span>
        <p>Comprados: {qtd}</p>
        <button onClick={() => onSale(desconto)}>Comprar</button>
      </span>
    </div>
  );
};

export default CupomComprar;
