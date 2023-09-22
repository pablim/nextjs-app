import { makeRequest } from "../Api";

export const getUserRequest = () => {

    return makeRequest.get('/teste', {
        
    }).then((response) => {
        return response
    })

    // return makeRequest.get('/api/v1/products.json', {
    //     brand:'maybelline'
    // }).then((response) => {
    //     return response
    // })
}