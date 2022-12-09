import {useDispatch, useSelector} from "react-redux";
import {logoutThunk, updateUserThunk} from "./users-thunk";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import { useEffect } from "react";
import { findPokemonCaughtByUserThunk, userReleasesPokemonThunk } from "../catches/catches-thunks";
import { findCommentsByAuthorThunk, deleteCommentThunk } from "../comments/comments-thunks";
import { useState } from "react";

const Profile = () => {
    const navigate = useNavigate()
    const {currentUser} = useSelector((state) => state.users)
    const {comments} = useSelector((state) => state.comments)
    const {catches} = useSelector((state) => state.catches)
    const [fullName, setFullName] = useState(currentUser.fullName)
    const [email, setEmail] = useState(currentUser.email)
    const [bio, setBio] = useState(currentUser.bio)
    const [region, setRegion] = useState(currentUser.region)
    const [favorite, setFavorite] = useState(currentUser.favorite)
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
    const handleUpdate = () => {
        dispatch(updateUserThunk([currentUser._id, {fullName, email, bio, region, favorite}]))
    }
    return(
        <>
            <h1>{currentUser.role} Profile - {currentUser.username}</h1>
            <h2>Edit Information</h2>
            <label for="name" class="form-check-label">Full Name: &#160;</label>
            <input
                onChange={(e) => setFullName(e.target.value)}
                className="form-control"
                id="name"
                value={fullName}/>
            <label for="email" class="form-check-label mt-1">Email: &#160;</label>
            <input
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="email"
                value={email}/>
            <label for="bio" class="form-check-label mt-1">Bio: &#160;</label>
            <input
                onChange={(e) => setBio(e.target.value)}
                className="form-control"
                id="bio"
                value={bio}/>
            <label for="region" class="form-check-label mt-1">Region: &#160;</label>
            <input
                onChange={(e) => setRegion(e.target.value)}
                className="form-control"
                id="region"
                value={region}/>
            <label for="favorite" class="form-check-label mt-1">Favorite Pokemon: &#160;</label>
            <input
                onChange={(e) => setFavorite(e.target.value)}
                className="form-control"
                id="favorite"
                value={favorite}/>
            <button
                className="btn btn-primary w-10 mt-2"
                onClick={handleUpdate}>
                Update Information
            </button>
            <h2>Comments</h2>
            <ul className="list-group">
                {
                    comments && comments.map((comment) =>
                    <li className="list-group-item"
                        key={comment._id}>
                        {
                            currentUser &&
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
                className="btn btn-danger float-end my-3"
                onClick={handleLogoutBtn}>
                Logout
            </button>
        </>
    )
}
export default Profile