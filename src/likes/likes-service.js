import axios from "axios";

const USERS_URL = 'http://localhost:4000/users'

export const userLikesPokemon = async (uid, pid) => {
    const response = await axios.post(`${USERS_URL}/${uid}/likes/${pid}`)
    return response.data
}

export const findPokemonCaughtByUser = async (uid) => {
    const response = await axios.get(`${USERS_URL}/${uid}/likes`)
    return response.data
}

export const userUnlikesPokemon = async (uid, pid) => {
    const response = await axios.delete(`${USERS_URL}/${uid}/unlikes/${pid}`)
    return response.data
}