import { useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"

import { selectUserById } from "../usersSlice"
import { selectPostByUser } from "../../posts/postsSlice"

const SingleUserPage = () => {
  const {userId} = useParams()
  const user = useSelector(state => selectUserById(state, userId))
  const postsForUser = useSelector(state => {
    selectPostByUser(state, userId)
  })
  const postTitles = postsForUser.map(post => (
    <li key={post.id}>
      <NavLink to={`/posts/${post.id}`}>
        {post.title}
      </NavLink>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>
        {postTitles}
      </ul>
    </section>
  )
}

export default SingleUserPage

