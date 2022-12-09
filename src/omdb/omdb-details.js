import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findPokemonByNameThunk} from "./omdb-thunks";
import {createCommentThunk, findCommentsByPokemonThunk, deleteCommentThunk} from "../comments/comments-thunks";
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
    },[comments])
    const handlePostCommentBtn = () => {
        dispatch(createCommentThunk({
            comment,
            pokemon_name
        }))
    } 
    return( 
        <>
            <h1>{details.name?.toUpperCase()}</h1>
            <div className="row">
                <div className="col">
                    <ul className="list-group">
                        <li className="list-group-item" key="Pokedex">Pokedex Number: {details.id}</li>
                        <li className="list-group-item" key="Height">Height: {details.height / 10} meters</li>
                        <li className="list-group-item" key="Weight">Weight: {details.weight / 10} kilograms</li>
                        <li className="list-group-item" key="Types">Types:
                            <ul>
                                {
                                    details.types?.map( type => <li key="type.type.name">{type.type.name}</li>)
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
            <h2 class="mt-2">Comments</h2>
            {
                currentUser &&
                <div>
                    <textarea
                        onChange={(e) => setComment(e.target.value)}
                        className="form-control"></textarea>
                    <button class="mb-1 btn btn-secondary display-flex w-10 float-end" onClick={handlePostCommentBtn}>Post Comment</button>
                </div>
            }
            <ul className="list-group w-100">
                {
                    comments.map((comment) =>
                        <li className="list-group-item" key={comment._id}>
                        {
                            currentUser && (currentUser.role === "MODERATOR" || currentUser._id === comment.author._id) &&
                            <i onClick={() => {
                                dispatch(deleteCommentThunk(comment._id))
                            }}
                                className="px-2 float-end bi bi-trash"></i>
                        }
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