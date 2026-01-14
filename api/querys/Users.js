import { query } from '../Api';

export const getUsers = () => {
    return query(`
        query { 
            users { 
                name
            }
        }	
    `)
}

