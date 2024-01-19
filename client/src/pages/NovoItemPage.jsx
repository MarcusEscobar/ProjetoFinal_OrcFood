import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createItem, updateItem } from "../services/api";

const NovoItemPage = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [serve, setServe] = useState(0);
  const [edit, setEdit] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if (location.state !== null) {
      setId(location.state.item._id)
      setName(location.state.item.name);
      setDescription(location.state.item.description);
      setPrice(location.state.item.price);
      setImage(location.state.item.image);
      setCategory(location.state.item.category);
      setServe(location.state.item.serve);
      setEdit(location.state.edit)
      
    } 
  }, []);

 // console.log(id)
/*
let itemId = "";

if (location.state !== null) {
  editItem = true;
  itemId = location.state.id;
  console.log("id", itemId);
}

*/

  const handleUpdateItem = async () => {
    try {

      await updateItem(
        id,
        name,
        description,
        price,
        image,
        category,
        serve
      );
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewItem = async () => {
    console.log("new item");
    try {
      await createItem(name, description, price, image, category, serve);
      navigate("/");
    } catch (err) {
      console.error(err);
      //   setLoadingError(true);
    }
  };

  return (
    <div className="novo_item">
      <div>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Insira o nome do novo item"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <p>Descrição:</p>
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price">Preço:</label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Insira o preço do item"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="image">Imagem:</label>
        <input
          type="text"
          name="image"
          id="image"
          placeholder="Insira a URL da imagem"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="category">Categoria: </label>
        <select onChange={(e)=>{setCategory(e.target.value)}} name="category" id="category">
          <option value={'Entrada'}>Entrada</option>
          <option value={'Prato principal'}>Prato principal</option>
          <option value={'Sobremesa'}>Sobremesa</option>
          <option value={'Bebida'}>Bebida</option>
        </select>
      </div>


      <div>
        <label htmlFor="serve">Serve quantas pessoas:</label>
        <input
          type="number"
          name="serve"
          id="serve"
          value={serve}
          onChange={(e) => setServe(e.target.value)}
        />
      </div>
      <div>
        {edit ? (
          <button onClick={handleUpdateItem}>Atualizar</button>
        ) : (
          <button onClick={handleNewItem}>Adicionar</button>
        )}
      </div>
    </div>
  );
};

export default NovoItemPage;
