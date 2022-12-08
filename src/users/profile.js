import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "./users-thunk";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate()
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const handleLogoutBtn = () => {
        dispatch(logoutThunk())
        navigate('/login')
    }
    const {reviews} = useSelector((state) => state.reviews)
    return(
        <>
            <h1>Profile</h1>
            {
                currentUser &&
                <h2>{currentUser.username}</h2>
            }
            <p>Public information AND Private information with editing</p>
            <h1>Comments</h1>
            <ul>
                {
                    reviews && reviews.map((review) =>
                    <li>
                        <Link to={`/details/${review.imdbID}`}>
                        {review.review} {review.imdbID}
                        </Link>
                    </li>
                    )
                }
            </ul>
            <h1>Caught Pokemon</h1>
            <ul>
                {
                    reviews && reviews.map((review) =>
                    <li>
                        <Link to={`/details/${review.imdbID}`}>
                        {review.review} {review.imdbID}
                        </Link>
                    </li>
                    )
                }
            </ul>
            <button
                className="btn btn-danger"
                onClick={handleLogoutBtn}>
                Logout
            </button>
        </>
    )
}
export default Profile