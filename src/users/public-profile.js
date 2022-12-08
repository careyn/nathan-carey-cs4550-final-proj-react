import {useParams} from "react-router";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findUserByIdThunk} from "./users-thunk";
import {findCommentsByAuthorThunk} from "../comments/comments-thunks";
import {Link} from "react-router-dom";

const PublicProfile = () => {
    const {uid} = useParams()
    const {publicProfile} = useSelector((state) => state.users)
    const {comments} = useSelector((state) => state.comments)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findUserByIdThunk(uid))
        dispatch(findCommentsByAuthorThunk(uid))
    }, [uid])
    return(
        <>
            <h1>{publicProfile && publicProfile.username}</h1>
            <p>Public information</p>
            <h1>Comments</h1>
            <ul>
                {
                    comments && comments.map((comment) =>
                    <li>
                        <Link to={`/details/${comment.pokemon_name}`}>
                        {comment.comment} {comment.pokemon_name}
                        </Link>
                    </li>
                    )
                }
            </ul>
            <h1>Caught Pokemon</h1>
            <ul>
                {
                    comments && comments.map((comment) =>
                    <li>
                        <Link to={`/details/${comment.pokemon_name}`}>
                        {comment.comment} {comment.pokemon_name}
                        </Link>
                    </li>
                    )
                }
            </ul>
        </>
    )
}

export default PublicProfile