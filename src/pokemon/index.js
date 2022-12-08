import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {createPokemonThunk, deletePokemonThunk, findAllPokemonThunk} from "./pokemon-thunks";
import {userLikesMovieThunk} from "../likes/likes-thunks";

const Pokemon = () => {
    const {currentUser} = useSelector((state) => state.users)
    const {pokemons} = useSelector((state) => state.pokemon)
    const [pokemon, setPokemon] = useState({name: ''})
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findAllPokemonThunk())
    }, [])
    return(
        <>
            {
                currentUser &&
                <>
                    <h2>Welcome {currentUser.username} </h2>
                    <h1>Your Pokemon</h1>
                    <ul className="list-group">
                        {
                            pokemons.map((pokemon) =>
                                <li className="list-group-item"
                                    key={pokemon._id}>
                                    <i onClick={() => {
                                        dispatch(deletePokemonThunk(pokemon._id))
                                    }}
                                        className="bi bi-trash float-end"></i>

                                    <i onClick={() => {
                                        dispatch(userLikesMovieThunk({
                                            uid: 111, mid: pokemon._id//imdbID
                                        }))
                                    }} className="float-end bi bi-hand-thumbs-up me-2"></i>
                                    <i className="float-end bi bi-hand-thumbs-down me-2"></i>


                                    {pokemon.name}
                                </li>
                            )
                        }
                    </ul>
                </>
            }
        
            <h1>All Pokemon</h1>
            <ul className="list-group">
                <li className="list-group-item">
                    <button className="btn btn-success float-end" onClick={() => {
                        dispatch(createPokemonThunk(
                            {
                                name: pokemon.name
                            }
                        ))
                    }}>Create</button>
                    <input
                        className="form-control w-75"
                        onChange={(e) =>
                            setPokemon({...pokemon, name: e.target.value})}
                        value={pokemon.name}/>
                </li>
                {
                    pokemons.map((pokemon) =>
                        <li className="list-group-item"
                            key={pokemon._id}>
                            <i onClick={() => {
                                dispatch(deletePokemonThunk(pokemon._id))
                            }}
                                className="bi bi-trash float-end"></i>

                            <i onClick={() => {
                                dispatch(userLikesMovieThunk({
                                    uid: 111, mid: pokemon._id//imdbID
                                }))
                            }} className="float-end bi bi-hand-thumbs-up me-2"></i>
                            <i className="float-end bi bi-hand-thumbs-down me-2"></i>


                            {pokemon.name}
                        </li>
                    )
                }
            </ul>
        </>
    )
}

export default Pokemon;