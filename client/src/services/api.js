import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const getItens = async (query) => {
    let url = '/cardapio/';

    if (query !== '') {
        url += `?q=${query}`;
    }

    return api.get(url);
};

export const createItem = async (name, description, price, image, category, serve) => {
    const url = '/cardapio/';
    return api.post(url, {name: name, description: description, price: price, image: image, category: category, serve: serve});
};

export const destroyItem = async (itemId) => {
    const url = `/cardapio/${itemId}/`;
    return api.delete(url);
};