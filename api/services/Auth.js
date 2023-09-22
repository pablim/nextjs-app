import { makeRequest } from "../Api";

export const loginRequest = (data) => {
    debugger
    return makeRequest.post('/auth', data).then((response) => {
        return response
    })
}