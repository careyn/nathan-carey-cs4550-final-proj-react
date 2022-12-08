import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findPokemonByNameThunk} from "./omdb-thunks";
import {createCommentThunk, findCommentsByPokemonThunk} from "../comments/comments-thunks";
import {Link} from "react-router-dom";

const OmdbDetails = () => {
    const {pokemon_name} = useParams()
    const [comment, setComment] = useState('')
    const {comments} = useSelector((state) => state.comments)
    const {details} = useSelector((state) => state.omdb)
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findPokemonByNameThunk(pokemon_name))
        dispatch(findCommentsByPokemonThunk(pokemon_name))
    },[])
    const handlePostCommentBtn = () => {
        dispatch(createCommentThunk({
            comment,
            pokemon_name
        }))
    } 
    console.log(details)
    return( 
        <>
            <h1>{details.name}</h1>
            <div className="row">
                <div className="col">
                    <ul className="list-group">
                        <li className="list-group-item">Pokedex Number: {details.id}</li>
                        <li className="list-group-item">Height: {details.height / 10} meters</li>
                        <li className="list-group-item">Weight: {details.weight / 10} kilograms</li>
                        <li className="list-group-item">Types:
                            <ul>
                                {
                                    details.types?.map( type => <li>{type.type.name}</li>)
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="col">
                    { 
                        <img src={details.sprites?.front_default} height="100%"/> 
                    }
                </div>
            </div>
            {
                currentUser &&
                <div>
                    <textarea
                        onChange={(e) => setComment(e.target.value)}
                        className="form-control"></textarea>
                    <button onClick={handlePostCommentBtn}>Post Comment</button>
                </div>
            }
            <ul className="list-group">
                {
                    comments.map((comment) =>
                        <li className="list-group-item">
                            {comment.comment}
                            <Link to={`/profile/${comment.author._id}`} className="float-end">
                                {comment.author.username}
                            </Link>
                        </li>
                    )
                }
            </ul>
        </>
    )
}
export default OmdbDetails