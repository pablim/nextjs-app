import { request } from "../Api";

const commonURL = '/api/googleWallet/loyalty';

export const create = (data) => {
    return request.post(`${commonURL}/loyalty-create`, data)
        .then((response) => {
            return response
        })
}

export const getLoyalty = (data) => {
    return request.get(`${commonURL}/get-loyalty`, data)
        .then((response) => {
            return response
        })
}
