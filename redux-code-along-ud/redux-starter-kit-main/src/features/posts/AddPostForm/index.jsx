import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { postAdded } from "../postsSlice"

const AddPostForm = () => {
  // states
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  // dispatch and selector
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  // events
  const handleTitleChange = (e) => setTitle(e.target.value)
  const handleContentChange = (e) => setContent(e.target.value)
  const handleAuthorChange = (e) => setUserId(e.target.value)
  const handleSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId))

      setTitle('')
      setContent('')
    }
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>{ user.name }</option>
  ))

  return (
    <section>
      <h2>Add a new post</h2>

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

        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          value={ userId }
          onChange={ handleAuthorChange }
        >
          <option value="">-- SELECT --</option>
          { usersOptions }
        </select>

        <button
          type="button"
          onClick={handleSavePostClicked}
          disabled={ !canSave }
        >Save</button>
      </form>
    </section>
  )
}

export default AddPostForm

