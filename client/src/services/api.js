import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const createSession = async (email, password) => {
  return api.post("/sessions", { email, password });
};

export const createUser = async (name, endereco, email, password) => {
  return api.post("/users", {
    name,
    endereco,
    email,
    password,
    scope: "cliente",
  });
};

export const getItens = async (query) => {
  let url = "/cardapio/";

  if (query !== "") {
    url += `?q=${query}`;
  }

  console.log('query', url);

  return api.get(url);
};

export const getItem = async (itemId) => {
  const url = `/cardapio/${itemId}`;
  return api.get(url);
};

export const createItem = async (
  name,
  description,
  price,
  image,
  category,
  serve
) => {
  const url = "/cardapio/";
  return api.post(url, { name, description, price, image, category, serve });
};

export const updateItem = async (
  itemId,
  name,
  description,
  price,
  image,
  category,
  serve
) => {
  const url = `/cardapio/${itemId}`;
  return api.put(url, {
    itemId,
    name,
    description,
    price,
    image,
    category,
    serve,
  });
};

export const destroyItem = async (itemId) => {
  const url = `/cardapio/${itemId}`;
  return api.delete(url);
};
