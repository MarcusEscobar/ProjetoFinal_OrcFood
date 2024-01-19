import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Cardapio.css";

// import { getItens, destroyItem } from "../services/api";
import { AuthContext } from "../../contexts/auth";
import ProductCard from "../ProductCard/ProductCard";

const Cardapio = ({ cardapio, onLoadData, query, onDeleteItem }) => {
  let location = useLocation();

  const { user } = useContext(AuthContext);

  return (
    <div className="cardapio">
      <div className="cardapio_title">
        <h2>Cardápio</h2>
        {user.scope === "adm" ? (
          <Link to="/newitem" className="btn_newitem">
            Adicionar item
          </Link>
        ) : (
          <></>
        )}
      </div>

      <section className="products container">
        {cardapio.map((product) => (
          <ProductCard key={product._id} item={product} deleteItem={onDeleteItem}/>
        ))}
      </section>
{/*
      {cardapio.map((item) => {
        <section className="item" key={item._id}>
          <ProductCard key={item._id} data={item} />

          {user.scope === "adm" ? (
            <div>
              <Link to="/newitem" state={{ item, edit: true }}>
                Editar
              </Link>
              <button type="button" onClick={() => onDeleteItem(item)}>
                Apagar
              </button>
            </div>
          ) : (
            <></>
          )}
          
        </section>;
      })}
      */}
    </div>
  );
};

export default Cardapio;
