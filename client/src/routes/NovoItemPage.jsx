import React, {useState} from 'react'

const NovoItemPage = ({onNewItem}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [serve, setServe] = useState(0);

  return (
    <div className='novo_item'>
        <div>
            <label htmlFor="name">Nome:</label>
            <input 
                type="text" 
                name="name" 
                id="name" 
                placeholder='Insira o nome do novo item'
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
                placeholder='Insira o preço do item'
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
                placeholder='Insira a URL da imagem' 
                value={image}
                onChange={(e) => setImage(e.target.value)}
                />
        </div>
        <div>
            <p>Categoria:</p>
            <select name="category" id="category">
                {/* category.map() */}
                <option value="category1" onChange={(e) => setCategory(e.target.value)}>1</option>
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
            <button onClick={() => onNewItem(name, description, price, image, category, serve)}>Adicionar</button>
        </div>
    </div>
  )
}

export default NovoItemPage