import { request } from "../Api";

export const get = () => {
    return request.get('/teste', {})
    .then((response) => {
        return response
    })
}