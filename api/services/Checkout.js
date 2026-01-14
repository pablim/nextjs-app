import { request } from "../Api";

export const checkout = (data) => {

    return request.post('/api/mercadopago/payment', data, {
        'Content-Type': 'multipart/form-data'
    }).then((response) => {
        return response
    })
}