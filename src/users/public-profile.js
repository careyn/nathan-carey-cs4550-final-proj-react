import {useParams} from "react-router";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findUserByIdThunk} from "./users-thunk";
import {findCommentsByAuthorThunk, deleteCommentThunk} from "../comments/comments-thunks";
import {Link} from "react-router-dom";
import { findPokemonCaughtByUserIDThunk } from "../catches/catches-thunks";

const PublicProfile = () => {
    const {uid} = useParams()
    const {publicProfile} = useSelector((state) => state.users)
    const {comments} = useSelector((state) => state.comments)
    const {catches} = useSelector((state) => state.catches)
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findUserByIdThunk(uid))
        dispatch(findCommentsByAuthorThunk(uid))
        dispatch(findPokemonCaughtByUserIDThunk(uid))
    }, [uid])
    return(
        <>
            <h1>{publicProfile && publicProfile.username}</h1>
            <h2>Public Information</h2>
            <ul class="list-group">
                <li class="list-group-item"><b>Bio:</b> {publicProfile.bio}</li>
                <li class="list-group-item"><b>Region:</b> {publicProfile.region}</li>
                <li class="list-group-item"><b>Favorite Pokemon:</b> {publicProfile.favorite}</li>
            </ul>
            <h2>Comments</h2>
            <ul class="list-group">
                {
                    comments && comments.map((comment) =>
                    <li class="list-group-item" key={comment._id}>
                        {
                            currentUser && (currentUser.role === "MODERATOR" || currentUser._id === uid) &&
                            <i onClick={() => {
                                dispatch(deleteCommentThunk(comment._id))
                            }}
                                className="float-end bi bi-trash"></i>
                        }
                        <Link to={`/details/${comment.pokemon_name}`}>
                        {comment.comment} - {comment.pokemon_name}
                        </Link>
                    </li>
                    )
                }
            </ul>
            <h2>Caught Pokemon</h2>
            <ul class="list-group">
                {
                    catches && catches.map((c) =>
                    <li class="list-group-item">
                        <Link to={`/details/${c.pokemon.name}`}>
                            {c.pokemon.name}
                        </Link>
                    </li>
                    )
                }
            </ul>
        </>
    )
}

export default PublicProfile