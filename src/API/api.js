import * as axios from "axios";

let instance = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/http://104.248.55.153:5000/api/v0/data',
})

export const api = {
    getUsers(page = 1, limit = 9) {
        return instance.get(`?page=${page}&limit=${limit}`)
            .then (response => response.data )
    },
    createUser (user) {
        return instance.post('', user)
            .then(response => response.data)
    },
    updateUser (user) {
        return instance.put('', user)
            .then(response => response.data)
    },  
    deleteUser(id) {
        return instance.delete(`${id}`)
            .then(response => response.data)
    }, 
}