/* eslint-disable */
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {findAllUsersThunk} from "./users-thunk";
import {Link} from "react-router-dom";


const Users = () => {
    const {users, loading} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findAllUsersThunk())
    }, [])
    return(
        <>
            <h1>Users</h1>
            <ul className="list-group">
                {
                    users.map((user) =>
                    <li key={user._id} className="list-group-item">
                        <Link to={`/profile/${user._id}`} className="list-group-item">
                            {user.username} - {user.role}
                        </Link>
                    </li>
                    )
                }
            </ul>
        </>
    )
}

export default Users