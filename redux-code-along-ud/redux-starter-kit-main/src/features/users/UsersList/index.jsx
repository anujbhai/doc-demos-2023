import { useSelector } from "react-redux"
import { selectAllUsers } from "../usersSlice"
import { NavLink } from "react-router-dom"

const UsersList = () => {
  const users = useSelector(selectAllUsers)

  const renderedUser = users.map(user => (
    <li key={user.id}>
      <NavLink to={`/users/${user.id}`}>
        {user.name}
      </NavLink>
    </li>
  ))
  return (
    <section>
      <h2>Users</h2>

      <ul>
        {renderedUser}
      </ul>
    </section>
  )
}

export default UsersList

