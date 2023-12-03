import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { postUpdated, selectPostById } from '../postsSlice'

const EditPostForm = () => {
  const { postId } = useParams()
  const post = useSelector((state) => selectPostById(state, postId))
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleTitleChange = (e) => setTitle(e.target.value)
  const handleContentChange = (e) => setContent(e.target.value)

  const handleSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postUpdated({
          id: postId,
          title,
          content,
        })
      )

      navigate(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit post</h2>

      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={handleTitleChange}
        />

        <label htmlFor="postContent">Post Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={handleContentChange}
        />

        <button type="button" onClick={handleSavePostClicked}>
          Save
        </button>
      </form>
    </section>
  )
}

export default EditPostForm
