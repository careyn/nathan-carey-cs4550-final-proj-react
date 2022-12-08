import axios from "axios";

const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

export const findPokemonBySearchTerm = async (term) => {
    const response = await axios.get(`${API_URL}${term}`)
    console.log(response.data)
    return [response.data]
}

export const findPokemonByName = async (pokemon_name) => {
    const response = await axios.get(`${API_URL}${pokemon_name}`)
    console.log(response.data)
    return response.data
}