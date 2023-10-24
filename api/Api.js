import axios from "axios";

const getApiUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL
}

const defaultHeaders = {
}

const defaultGetHeaders = {
    ...defaultHeaders,
}
const defaultPostHeaders = {
    ...defaultHeaders,
}

const handleSuccess = (response) => {
    return response
}

const handleError = (error) => {
    return new Promise((resolve, reject) => {
        reject(error);
    })
}


const getAuthToken = () => {
    if (typeof(localStorage) != 'undefined')
        return {'Authorization': `Bearer ` + localStorage?.getItem('authToken')}
}

const request = {
    get: async (endpoint, params, additionalHeaders={}) => {
        debugger
        const url = getApiUrl() + endpoint

        return axios.get(url, { 
            params,
            headers: {
                ...defaultGetHeaders,
                ...additionalHeaders,
                ...getAuthToken()
            },
        })
        .then(handleSuccess)
        .catch(handleError)
    },
    post: async (endpoint, params, additionalHeaders={}) => {  
        const url = getApiUrl() + endpoint

        return axios.post(url, params, {
            headers: {
                ...defaultPostHeaders,
                ...additionalHeaders,
                ...getAuthToken()
            }
        })
        .then(handleSuccess)
        .catch(handleError)
    }
}

export {
    getApiUrl,
    request,
};