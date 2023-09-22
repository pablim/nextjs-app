import { makeRequest } from "../Api";

export const checkout = (data) => {

    return makeRequest.post(
        '/mercadopago-payment.php', 
        data,
        {
            'Content-Type': 'multipart/form-data'
        }
    ).then((response) => {
        return response
    })
}