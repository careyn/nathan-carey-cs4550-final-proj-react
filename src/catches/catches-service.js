import axios from "axios";

const USERS_URL = 'https://pokemon-hunt.herokuapp.com/users'

export const userCatchesPokemon = async (uid, pid) => {
    const response = await axios.post(`${USERS_URL}/${uid}/catches/${pid}`)
    return response.data
}

export const findPokemonCaughtByUser = async (uid) => {
    const response = await axios.get(`${USERS_URL}/${uid}/catches`)
    return response.data
}

export const userReleasesPokemon = async (uid, pid) => {
    const response = await axios.delete(`${USERS_URL}/${uid}/releases/${pid}`)
    return response.data
}