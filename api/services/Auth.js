import { request } from "../Api";

export const authentication = (data) => {
    return request.post('/api/auth', data).then((response) => {
        return response
    })
}