import { request } from "graphql-request";

export default function query (query, vars) {

    return request(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, query, vars)
    .then(data => data)
    .catch(error => error)

}