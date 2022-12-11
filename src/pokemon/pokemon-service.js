/* eslint-disable */
import axios from "axios";
const POKEMON_API_URL = 'http://localhost:4000/pokemon'

export const createPokemon = async (newPokemon) => {
    const response = await axios.post(POKEMON_API_URL, newPokemon)
    const actualPokemon = response.data
    return actualPokemon
}
export const findAllPokemon = async () => {
    const response = await axios.get(POKEMON_API_URL)
    const pokemon = response.data
    return pokemon
}
export const deletePokemon = async (pid) => {
    const response = await axios.delete(`${POKEMON_API_URL}/${pid}`)
    const status = response.data
    return pid;
}