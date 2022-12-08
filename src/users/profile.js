import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "./users-thunk";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import { useEffect } from "react";
import { findPokemonCaughtByUserThunk, userUnlikesPokemonThunk } from "../likes/likes-thunks";
import { findCommentsByAuthorThunk } from "../comments/comments-thunks";

const Profile = () => {
    const navigate = useNavigate()
    const {currentUser} = useSelector((state) => state.users)
    const {comments} = useSelector((state) => state.comments)
    const {likes} = useSelector((state) => state.likes)
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
    }, [currentUser, likes])
    return(
        <>
            <h1>Profile - {currentUser.username}</h1>
            <p>Public information AND Private information with editing</p>
            <h1>Comments</h1>
            <ul className="list-group">
                {
                    comments && comments.map((comment) =>
                    <li className="list-group-item">
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
                            likes.map((like) =>
                                <li className="list-group-item"
                                    key={like.pokemon._id}>
                                    <i onClick={() => {
                                            dispatch(userUnlikesPokemonThunk({
                                                uid: currentUser._id, pid: like.pokemon._id
                                            }))
                                        }}
                                        className="bi bi-x float-end"></i>
                                    <Link to={`/details/${like.pokemon.name}`}>
                                        {like.pokemon.name}
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