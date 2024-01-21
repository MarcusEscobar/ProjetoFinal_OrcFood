import { useState } from "react";
import "./Filtro.css";

function Filtro({
  isFiltroVisible,
  filtraCategory,
  filtraPrice,
  filtraServe,
  setFiltro,
}) {
  const [preco, setPreco] = useState(10);
  const [pessoas, setPessoas] = useState(1);

  return (
    <div className={`filtro ${isFiltroVisible ? "filtro--active" : ""}`}>
      <div className="contaiderButtons">
        <button onClick={() => filtraCategory("Entrada")}>Entradas</button>
        <button onClick={() => filtraCategory("Prato principal")}>
          Pratos principais
        </button>
        <button onClick={() => filtraCategory("Sobremesa")}>Sobremesas</button>
        <button onClick={() => filtraCategory("Bebida")}>Bebidas</button>
        <button onClick={() => setFiltro(false)}>Todos</button>
      </div>

      <div>
        <input
          placeholder="Filtar por preço máximo"
          type="number"
          onChange={(e) => {
            setPreco(e.target.value);
          }}
          id="filtroPreco"
        />
        <button
          onClick={() => {
            document.getElementById("filtroPreco").value = "";
            filtraPrice(preco);
          }}
          className="btnPedidos"
        >
          Buscar
        </button>
      </div>
      <div>
        <input
          placeholder="Para Quantos?"
          type="number"
          onChange={(e) => {
            setPessoas(e.target.value);
          }}
          id="filtroPessoas"
        />
        <button
          onClick={() => {
            document.getElementById("filtroPessoas").value = "";
            filtraServe(pessoas);
          }}
          className="btnPedidos"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default Filtro;
