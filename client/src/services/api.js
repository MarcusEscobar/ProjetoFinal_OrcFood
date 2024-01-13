import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const getItens = async(query) => {
    let url = '/cardapio/'

    if (query !== '') {
        url += `?q=${query}`
    }

    return api.get(url);
};