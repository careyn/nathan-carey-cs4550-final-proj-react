import {useParams} from "react-router";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findUserByIdThunk} from "./users-thunk";
import {findReviewsByAuthorThunk} from "../reviews/reviews-thunks";
import {Link} from "react-router-dom";

const PublicProfile = () => {
    const {uid} = useParams()
    const {publicProfile} = useSelector((state) => state.users)
    const {reviews} = useSelector((state) => state.reviews)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findUserByIdThunk(uid))
        dispatch(findReviewsByAuthorThunk(uid))
    }, [uid])
    return(
        <>
            <h1>{publicProfile && publicProfile.username}</h1>
            <p>Public information</p>
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
        </>
    )
}

export default PublicProfile