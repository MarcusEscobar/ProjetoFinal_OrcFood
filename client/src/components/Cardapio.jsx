import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/components/Cardapio.css";

// import { getItens, destroyItem } from "../services/api";
import { AuthContext } from "../contexts/auth";

const Cardapio = ({ cardapio, onLoadData, query, onDeleteItem }) => {
  let location = useLocation();

  const { user } = useContext(AuthContext)

  // const [cardapio, setCardapio] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [loadingError, setLoadingError] = useState(false);

  // const loadData = async (query = "") => {
  //   try {
  //     setLoading(true);
  //     const response = await getItens(query);
  //     setCardapio(response.data);
  //     setLoading(false);
  //   } catch (err) {
  //     console.error(err);
  //     setLoadingError(true);
  //   }
  // };

  // useEffect(() => {
  //   (async () => await loadData())();
  // }, []);

  // const handleDeleteItem = async (item) => {
  //   if(user === "adm"){
  //     console.log("Item deleted.", item._id);
  //     await destroyItem(item._id);
  //     await loadData();
  //   }
  //   console.log("Item deleted.", item._id);
  //     await destroyItem(item._id);
  //     await loadData();
  // };

  // const handleSearch = (query) => {
  //   console.log("query", query);
  //   LoadData(query);
  // };

  // if (loadingError) {
  //   return (
  //     <div className="loading">
  //       Erro ao carregar o cardápio.
  //     </div>
  //   )
  // }

  // if (loading) {
  //   return (
  //     <div className="loading">
  //       Carregando cardápio...
  //     </div>
  //   )
  // }

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
              <h3 className="item_name">{item.name}, {item._id}</h3>

              <Link to={`/cardapio/${item._id}`}>Detalhes</Link>

              {console.log(item.name)}
              {user.scope === "adm"? (
                <div>
                  <Link to='/newitem' state={{ id: item._id, name: item.name, description: item.description, price: item.price, image: item.image, category: item.category, serve: item.serve }}>Editar</Link>
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