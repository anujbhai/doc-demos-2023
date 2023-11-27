import { useSelector } from "react-redux"

const PostAuthor = props => {
  const { userId } = props

  const author = useSelector(state => state.users.find(user => user.id === userId))

  return <span>by { author ? author.name : 'Unknown User' }</span>
}

export default PostAuthor

