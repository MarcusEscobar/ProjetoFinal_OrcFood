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
    economy: {
      moedas: 3,
      tickets: 3,
    },
  });
};

export const updateUser = async (id, name, endereço, email, password) => {
  const url = `/users/${id}`;
  return api.put(url, { name, endereço, email, password })
} 

export const updateEconomy = async (id, moedas, tickets) => {
  const url = `users/${id}`;
  return api.put(url, { moedas, tickets })
}

export const getItens = async (query) => {
  let url = "/cardapio/";

  if (query !== "") {
    url += `?q=${query}`;
  }

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
  id,
  name,
  description,
  price,
  image,
  category,
  serve
) => {
  const url = `/cardapio`;
  return api.put(url, { id, name, description, price, image, category, serve });
};

export const destroyItem = async (itemId) => {
  const url = `/cardapio/${itemId}`;
  return api.delete(url);
};

export const createPedido = async (cliente, pedidos, status) => {
  const url = "/pedidos";
  return api.post(url, { cliente, pedidos, status });
};

export const getPedido = async (id) => {
  const url = `/pedidos/${id}`;
  return api.get(url);
};

export const getPedidos = async () => {
  const url = "/pedidos";
  return api.get(url);
};

export const updatePedido = async (id, cliente, pedidos, status) => {
  const url = "/pedidos";
  return api.put(url, { id, cliente, pedidos, status });
};

export const destroyPedido = async (itemId) => {
  const url = `/pedidos/${itemId}`;
  return api.delete(url);
};
