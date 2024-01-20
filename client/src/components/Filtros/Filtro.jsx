import { useState } from "react";
import "./Filtro.css"

function Filtro({ isFiltroVisible, filtraCategory, filtraPrice, filtraServe, setFiltro }) {
  const [preco, setPreco] = useState(10);
  const [pessoas, setPessoas] = useState(1);
  //const [isFiltroVisible, setIsFiltroVisible] = useState(false)

  return (
    <div className={`filtro ${isFiltroVisible ? "filtro--active" : ""}`}>
      <button onClick={() => setFiltro(false)}>Desfiltrar</button>
      <button onClick={() => filtraCategory("Entrada")}>
        Filtrar por Entradas
      </button>
      <button onClick={() => filtraCategory("Prato principal")}>
        Filtrar por Pratos principais
      </button>
      <button onClick={() => filtraCategory("Sobremesa")}>
        Filtrar por Sobremesas
      </button>
      <button onClick={() => filtraCategory("Bebida")}>
        Filtrar por Bebidas
      </button>
      <input
        type="number"
        onChange={(e) => {
          setPreco(e.target.value);
        }}
      />
      <button onClick={() => filtraPrice(preco)} className="btnPedidos">
        enviar
      </button>
      <input
        type="number"
        onChange={(e) => {
          setPessoas(e.target.value);
        }}
      />
      <button onClick={() => filtraServe(pessoas)} className="btnPedidos">
        enviar
      </button>
    </div>
  );
}

export default Filtro;
