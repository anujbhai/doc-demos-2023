import { useSelector } from "react-redux"
import PropTypes from "prop-types"

const PostAuthor = (props) => {
  const { userId } = props

  const author = useSelector(state => {
    return state.users.find(user => user.id === userId)
  })

  return <span>by {author ? author.name : "Unknown author"}</span>
}

PostAuthor.propTypes = {
  userId: PropTypes.string,
}

export default PostAuthor

