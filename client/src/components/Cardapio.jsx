import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/components/Cardapio.css";

// import { getItens, destroyItem } from "../services/api";
import { AuthContext } from "../contexts/auth";
import ProductCard from "./ProductCard/ProductCard";

const Cardapio = ({ cardapio, onLoadData, query, onDeleteItem }) => {
  let location = useLocation();

  const { user } = useContext(AuthContext)


  return (
    <div className="cardapio">
      <div className="cardapio_title">
        <h2>Cardápio</h2>
        {user.scope === "adm"? 
        <Link to="/newitem" className="btn_newitem">
          Adicionar item
        </Link>:<></>}
        
      </div>

      <ul>
        {cardapio.map((item) => {
          return (
            <li className="item" key={item._id}>
              <ProductCard key={item._id} data={item} />
              <picture>
                <img src={item.image} alt="#"  className="ImagensCardapio"/>
              </picture>
              <h3 className="item_name">{item.name}, {item._id}</h3>

              <Link to={`/cardapio/${item._id}`}>Detalhes</Link>


              {user.scope === "adm"? (
                <div>
                  <Link to='/newitem' state={{ item, edit: true }}>Editar</Link>
                  <button type="button" onClick={() => onDeleteItem(item)}>Apagar</button>
                </div>
              ) : <></>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cardapio;