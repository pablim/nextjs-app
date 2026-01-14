import { request } from "../Api";

const commonURL = '/api/auth ';

export const authentication = (data, headers) => request.post(`${commonURL}`, data, headers)