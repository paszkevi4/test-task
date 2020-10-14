import * as axios from "axios";

let instance = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/http://104.248.55.153:5000/api/v0/data',
})

export const api = {
    getUsers(pagination, params) {
        return instance.get(`?page=${pagination.current}&limit=${pagination.pageSize}&sortBy=${params.sortBy}&dir=${params.dir}${params.phrase && `&sortPhrase=${params.phrase}`}`)
            .then (response => response.data)
            .catch(err => err)
    },
    createUser (user) {
        return instance.post('', user)
            .then(response => response)
            .catch(err => err)
    },
    updateUser (user) {
        return instance.put('', user)
            .then(response => response)
            .catch(err => err)
    },  
    deleteUser(id) {
        return instance.delete(`${id}`)
            .then(response => response.data)
            .catch(err => err)
    }, 
}