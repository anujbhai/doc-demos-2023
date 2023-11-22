import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import { selectAllUsers } from "../usersSlice"

const UsersList = () => {
  const users = useSelector(selectAllUsers)

  const renderedUsers = users.map(user => (
    <li key={user.id}>
      <NavLink to={`/users/${user.id}`}>
        {user.name}
      </NavLink>
    </li>
  ))

  return (
    <section>
      <h2>Users</h2>

      <ul>{renderedUsers}</ul>
    </section>
  )
}

export default UsersList

