import axios from "axios";
import { defaultHead } from "next/head";

const getApiUrl = () => {
    if (process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "development") {
        // return "http://127.0.0.1:5000"
        //return "http://makeup-api.herokuapp.com"
        return "http://localhost"
    } else if (process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "staging") {
        return "http://stagingurl"
    } else if (process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "production") {
        return "http://productionurl"
    }
}

const apiUrl = () => {
    const apiUrl = 'localhost'
    return apiUrl
}

const defaultHeaders = {
    'Content-Type': 'text/json'
}

const handleSuccess = (response) => {
    console.log(response);
    return response
}

const handleError = (error) => {
    console.log(error);
}

const makeRequest = {

    get: async (endpoint, params, additionalHeaders={}) => {
        debugger

        const url = getApiUrl() + endpoint
        return await axios.get(url, { params }, {headers: {
                ...defaultHeaders,
                ...additionalHeaders
            }}
        )
            .then(handleSuccess)
            .catch(handleError)
    },
    post: async (endpoint, params, additionalHeaders={}) => {
        debugger
        
        const url = getApiUrl() + endpoint

        return await axios.post(url, params, {headers: {
                ...defaultHeaders,
                ...additionalHeaders
            }}
        )
            .then(handleSuccess)
            .catch(handleError)
    }
}

export {
    getApiUrl,
    apiUrl,
    makeRequest,
};