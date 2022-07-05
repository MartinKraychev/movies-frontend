import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;



export async function getMovieById(id) {
    return api.get(`/api-movies/movies/${id}/`)
}


export async function createMovie(data) {
    return api.post('/api-movies/movies/', data)
}

export async function editMovieById(id, data) {
    return api.put(`/api-movies/movies/${id}/`, data)
}

export async function deleteMovieById(id) {
    return api.del(`/api-movies/movies/${id}/`)
}

export async function getAllMovies() {
    return api.get('/api-movies/movies/')
}

export async function getAllGenres() {
    return api.get('/api-movies/genre/')
}


export async function sendRating(data){
    return api.post('/api-movies/rating/', data)
}

export async function getAllActors() {
    return api.get('/api-movies/actors/')
}

export async function search(field, fieldValue){
    return api.get(`/api-movies/movies/?${field}=${fieldValue}`)
}