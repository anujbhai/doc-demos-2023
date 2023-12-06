import { useSelector } from "react-redux"
import { selectUserById } from "../../users/usersSlice"

const PostAuthor = props => {
  const { userId } = props

  const author = useSelector(state => selectUserById(state, userId))

  return <span>by { author ? author.name : 'Unknown User' }</span>
}

export default PostAuthor

