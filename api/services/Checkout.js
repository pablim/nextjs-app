import { request } from "../Api";

export const checkout = (data) => {

    return request.post(
        '/mercadopago-payment.php', 
        data,
        {
            'Content-Type': 'multipart/form-data'
        }
    ).then((response) => {
        return response
    })
}