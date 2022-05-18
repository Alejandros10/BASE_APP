import {get, deleteRequest, post, put } from './api'

export class UserService {
    static getAll(token, queryParams = {}) {
        return get(`${process.env.REACT_APP_API_URL}users`, token, queryParams)
    }

    static getById(id, token) {
        return get(`${process.env.REACT_APP_API_URL}users/${id}`, token)
    }

    static bulkDelete(ids, token) {
        return deleteRequest(`${process.env.REACT_APP_API_URL}users`, { ids }, true, token)
    }

    static delete(id, token) {
        return deleteRequest(`${process.env.REACT_APP_API_URL}users/${id}`, null, false, token)
    }

    static create(data, token) {
        return post(`${process.env.REACT_APP_API_URL}users`, data, true, token)
    }

    static update(id, data, token) {
        return put(`${process.env.REACT_APP_API_URL}users/${id}`, data, true, token)
    }
}