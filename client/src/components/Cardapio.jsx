import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/components/Cardapio.css";

import { getItens, destroyItem } from "../services/api";
import { AuthContext } from "../contexts/auth";

import ItemModal from "./ItemModal";

const Cardapio = ({ onNewItem, onDeleteItem, query }) => {
  const { user } = useContext(AuthContext)

  const [cardapio, setCardapio] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  // const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const loadData = async (query = "") => {
    try {
      setLoading(true);
      const response = await getItens(query);
      setCardapio(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoadingError(true);
    }
  };

  useEffect(() => {
    (async () => await loadData())();
  }, []);

  const handleDeleteItem = async (item) => {
    console.log("Item deleted.", item._id);
    await destroyItem(item._id);
    await loadData();
  };

  const handleSearch = (query) => {
    console.log("query", query);
    LoadData(query);
  };

  if (loadingError) {
    return (
      <div className="loading">
        Erro ao carregar o cardápio.
      </div>
    )
  }

  if (loading) {
    return (
      <div className="loading">
        Carregando cardápio...
      </div>
    )
  }

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
              <picture>
                <img src={item.image} alt="#" />
              </picture>
              <h3 className="item_name">{item.name}</h3>
              <div>
                <Link to={`/cardapio/${item._id}`}>Detalhes</Link>
                {/* <ItemModal isOpen={openModal}>
                  <h1>{item.name}</h1>
                </ItemModal> */}
              </div>
              
              {user.scope === "adm"?<button type="button" onClick={() => handleDeleteItem(item)}>Apagar</button>: <></>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cardapio;
