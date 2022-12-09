import axios from "axios";

const COMMENTS_API = 'http://localhost:4000/api/comments'
const POKEMON_COMMENTS_API = 'http://localhost:4000/api/pokemon'
const AUTHOR_COMMENTS_API = 'http://localhost:4000/api/users'

const api = axios.create({withCredentials: true});

export const createComment = async (comment) => {
    const response = await api.post(COMMENTS_API, comment)
    return response.data
}

export const findCommentsByPokemon = async (pokemon_name) => {
    const response = await api.get(`${POKEMON_COMMENTS_API}/${pokemon_name}/comments`)
    return response.data
}

export const findCommentsByAuthor = async (author) => {
    const response = await api.get(`${AUTHOR_COMMENTS_API}/${author}/comments`)
    return response.data
}

export const deleteComment = async (cid) => {
    const response = await api.delete(`${COMMENTS_API}/${cid}`)
    const status = response.data
    return cid
}
