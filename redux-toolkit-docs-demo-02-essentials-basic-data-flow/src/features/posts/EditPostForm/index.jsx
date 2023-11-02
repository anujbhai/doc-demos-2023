import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectPostById } from '../postsSlice'

const EditPostForm = () => {
  const { postId } = useParams()

  // eslint-disable-next-line no-unused-vars
  const post = useSelector(state => selectPostById(state, postId))
}

export default EditPostForm

