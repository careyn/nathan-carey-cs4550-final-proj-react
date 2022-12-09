import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {createPokemonThunk, deletePokemonThunk, findAllPokemonThunk} from "./pokemon-thunks";
import {userCatchesPokemonThunk, findPokemonCaughtByUserThunk, userReleasesPokemonThunk} from "../catches/catches-thunks";
import { Link } from "react-router-dom";

const Pokemon = () => {
    const {currentUser} = useSelector((state) => state.users)
    const {pokemons} = useSelector((state) => state.pokemon)
    const {catches} = useSelector((state) => state.catches)
    const [pokemon, setPokemon] = useState({name: ''})
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findAllPokemonThunk())
    }, [])
    useEffect(() => {
        if (currentUser === "undefined" || currentUser === null || currentUser === undefined)
            dispatch(findPokemonCaughtByUserThunk())
        else {
            dispatch(findPokemonCaughtByUserThunk(currentUser))
        }
    }, [currentUser, catches])
    return(
        <>
            {
                currentUser &&
                <>
                    <h2 class="mt-1">Welcome Back {currentUser.username}! </h2>
                    <h1>Your Pokemon</h1>
                    <ul className="list-group">
                        {
                            catches.map((c) =>
                                <li className="list-group-item"
                                    key={c._id}>
                                    <i onClick={() => {
                                            dispatch(userReleasesPokemonThunk({
                                                uid: currentUser._id, pid: c.pokemon._id
                                            }))
                                        }}
                                        className="bi bi-x float-end"></i>
                                    <Link to={`/details/${c.pokemon.name}`}>
                                        {c.pokemon.name}
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </>
            }
        
            <h1 class="mt-1">All Pokemon</h1>
            <ul className="list-group">
                {
                    currentUser && (currentUser.role === "MODERATOR") &&
                    <li className="list-group-item" key="add">
                        <button className="btn btn-success float-end" onClick={() => {
                            dispatch(createPokemonThunk(
                                {
                                    name: pokemon.name
                                }
                            ))
                        }}>Add Pokemon</button>
                        <input
                            className="form-control w-75"
                            onChange={(e) =>
                                setPokemon({...pokemon, name: e.target.value.toLowerCase()})}
                            value={pokemon.name}/>
                    </li>
                }
                {
                    pokemons.map((pokemon) =>
                        <li className="list-group-item"
                            key={pokemon._id}>
                            {
                                currentUser && (currentUser.role === "MODERATOR") &&
                                <i onClick={() => {
                                    dispatch(deletePokemonThunk(pokemon._id))
                                }}
                                    className="float-end bi bi-trash"></i>
                            }
                            {   currentUser &&
                                <i onClick={() => {
                                            dispatch(userCatchesPokemonThunk({
                                                uid: currentUser._id, pid: pokemon._id
                                            }))
                                        }} className="bi bi-check2 me-2 float-end"></i>
                            }
                            <Link to={`/details/${pokemon.name}`}>
                                {pokemon.name}
                            </Link>
                        </li>
                    )
                }
            </ul>
        </>
    )
}

export default Pokemon;