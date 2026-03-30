import { request } from "../Api";

const commonURL = '/api/user';

export const addUser = (data) => request.post(`${commonURL}`, data)
export const getUser = (data) => request.get(`${commonURL}`, data)
export const getUserById = (data) => request.get(`${commonURL}/${data.id}`)