import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "./users-thunk";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import { useEffect } from "react";
import { findPokemonCaughtByUserThunk, userReleasesPokemonThunk } from "../catches/catches-thunks";
import { findCommentsByAuthorThunk } from "../comments/comments-thunks";

const Profile = () => {
    const navigate = useNavigate()
    const {currentUser} = useSelector((state) => state.users)
    const {comments} = useSelector((state) => state.comments)
    const {catches} = useSelector((state) => state.catches)
    const dispatch = useDispatch()
    const handleLogoutBtn = () => {
        dispatch(logoutThunk())
        navigate('/login')
    }
    useEffect(() => {
        if (currentUser === "undefined" || currentUser === null || currentUser === undefined)
            dispatch(findPokemonCaughtByUserThunk())
        else {
            dispatch(findPokemonCaughtByUserThunk(currentUser))
        }
    }, [currentUser, catches])
    useEffect(() => {
        if (currentUser === "undefined" || currentUser === null || currentUser === undefined)
            dispatch(findCommentsByAuthorThunk())
        else {
            dispatch(findCommentsByAuthorThunk(currentUser._id))
        }
    }, [currentUser, comments])
    return(
        <>
            <h1>Profile - {currentUser.username}</h1>
            <p>Public information AND Private information with editing</p>
            <h1>Comments</h1>
            <ul className="list-group">
                {
                    comments && comments.map((comment) =>
                    <li className="list-group-item"
                        key={comment._id}>
                        <Link to={`/details/${comment.pokemon_name}`}>
                        {comment.comment} {comment.pokemon_name}
                        </Link>
                    </li>
                    )
                }
            </ul>
            <h1>Caught Pokemon</h1>
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
            <button
                className="btn btn-danger float-end mt-10"
                onClick={handleLogoutBtn}>
                Logout
            </button>
        </>
    )
}
export default Profile