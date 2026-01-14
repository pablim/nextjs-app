import axios from "axios";

const getApiUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL
}

const defaultHeaders = {}

const defaultGetHeaders = {
    ...defaultHeaders,
}
const defaultPostHeaders = {
    ...defaultHeaders,
}

const handleSuccess = (response) => {
    console.log('response', response);
    console.log('etag', response.headers.get('etag'));

    const etag = response.headers.get('etag')
    const resource = (new URL(response.request.responseURL)).pathname
    //sessionStorage.setItem(resource, etag)

    return response
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 * https://axios-http.com/docs/handling_errors
 * 
 *  @param {*} error 
 */
const handleError = (error) => {
    debugger
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const status = error.response.status

        if (status >= 500 && status <= 599) {
            console.log(error.response.status, error.response.data);
        } else if (status >= 400 && status <= 499) {
            console.log(error.response.status, error.response.data);
        }

    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }

    //return error
    return new Promise((resolve, reject) => {
        reject(error);
    })
}

const getAuthToken = () => {
    if (typeof(localStorage) != 'undefined')
        return {'Authorization': `Bearer ` + localStorage?.getItem('authToken')}
}

const request = {
    get: (endpoint, params, additionalHeaders={}) => {
        const url = getApiUrl() + endpoint

        const resourceETAG = sessionStorage.getItem(endpoint)

        return axios.get(url, { 
            params,
            headers: {
                ...defaultGetHeaders,
                ...additionalHeaders,
                "If-None-Match": resourceETAG,
                "If-Match": resourceETAG,
                "Accept-Encoding": "gzip,compress",
                ...getAuthToken()
            },
        })
        .then(handleSuccess)
        .catch(handleError)
    },
    post: (endpoint, params, additionalHeaders={}) => {  
        
        const url = getApiUrl() + endpoint

        const resourceETAG = sessionStorage.getItem(endpoint)

        return axios.post(url, params, {
            headers: {
                ...defaultPostHeaders,
                ...additionalHeaders,
                "If-None-Match": resourceETAG,
                "If-Match": resourceETAG,
                "Accept-Encoding": "gzip,compress",
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