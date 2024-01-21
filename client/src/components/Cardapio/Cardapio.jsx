import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CgPlayListAdd } from "react-icons/cg";
import { AuthContext } from "../../contexts/auth";

import Filtro from "../Filtros/Filtro";
import ProductCard from "../ProductCard/ProductCard";
import "./Cardapio.css";

const Cardapio = ({ cardapio, onLoadData, query, onDeleteItem }) => {
  let location = useLocation();

  const { user } = useContext(AuthContext);

  const [filtrado, setFiltrado] = useState([]);
  const [filtro, setFiltro] = useState(false);
  const [isFiltroVisible, setIsFiltroVisible] = useState(false)

  const handleFiltragemCategory = (filtro) => {
    setFiltrado(cardapio.filter((elemento) => elemento.category === filtro));
    setFiltro(true);
  };

  const handleFiltragemPreco = (preco) => {
    setFiltrado(
      cardapio.filter((elemento) => parseFloat(elemento.price) <= preco)
    );
    setFiltro(true);
  };

  const handleFiltragemPessoas = (pessoas) => {
    setFiltrado(
      cardapio.filter((elemento) => parseFloat(elemento.serve) == pessoas)
    );
    setFiltro(true);
  };

  return (
    <div className="cardapio">
      <div className="cardapio_title">
        <h3>Cardápio</h3>
        {user.scope === "adm" ? (
          <Link to="/newitem" className="btn_newitem">
            <CgPlayListAdd /> Novo Item
          </Link>
        ) : (
          <></>
        )}
      </div>

      <button onClick={() => setIsFiltroVisible(!isFiltroVisible)} className="btn_filtro" >Filtrar</button>
      <Filtro
        filtraCategory={handleFiltragemCategory}
        filtraPrice={handleFiltragemPreco}
        filtraServe={handleFiltragemPessoas}
        setFiltro={setFiltro}
        isFiltroVisible={isFiltroVisible}
      />

      {filtro ? (
        <section className="products container">
          {filtrado.map((product, index) => (
            <ProductCard
              key={product._id}
              item={product}
              deleteItem={onDeleteItem}
              index={index}
            />
          ))}
        </section>
      ) : (
        <section className="products container">
          {cardapio.map((product, index) => (
            <ProductCard
              key={product._id}
              item={product}
              deleteItem={onDeleteItem}
              index={index}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default Cardapio;
