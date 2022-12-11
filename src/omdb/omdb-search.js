/* eslint-disable */
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findPokemonBySearchTermThunk} from "./omdb-thunks";
import {Link} from "react-router-dom";

const OmdbSearch = () => {
    const [searchTerm, setSearchTerm] = useState('pikachu')
    const {pokemon, loading} = useSelector((state) => state.omdb)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findPokemonBySearchTermThunk(searchTerm))
    }, [])
    return (
        <>
            <h1>Pokedex Search</h1>
            <ul className="list-group">
                <li className="list-group-item">
                    <button
                        className="btn btn-primary float-end"
                        onClick={() => {
                            dispatch(findPokemonBySearchTermThunk(searchTerm))
                        }}>Search
                    </button>
                    <input
                        className="form-control w-75"
                        onChange={(e) => {
                            setSearchTerm(e.target.value.toLowerCase())
                        }}
                        value={searchTerm}/>
                </li>
                {
                    pokemon && pokemon.map((monster) =>
                        <li key={monster.id} className="list-group-item">

                            <img src={monster.sprites?.front_default} height={50}/>
                            <Link to={`/details/${monster.name}`}>
                                {monster.name}
                            </Link>
                        </li>
                    )
                }
            </ul>
        </>
    )
}

export default OmdbSearch