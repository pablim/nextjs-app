import { request } from "../Api";

const commonURL = '/api/googleWallet/loyalty';

// metodo mais genérico, menos repetição nas chamadas dos serviços
const get = (url, data) => request.get(`${commonURL}${url}`, data)
const post = (url, data) => request.post(`${commonURL}${url}`, data)

export const createTeste = (data) => post('/loyalty-create', data)
export const getLoyalty = (data) => get('/get-loyalty', data)
