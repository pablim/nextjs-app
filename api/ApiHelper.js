import { request } from "./Api";

export const helper = (commonURL) => {
    
    // metodo mais genérico, menos repetição nas chamadas dos serviços
    const get = (url, data) => request.get(`${commonURL}${url}`, data)
    const post = (url, data) => request.post(`${commonURL}${url}`, data)
    
    return [post, get]
}
