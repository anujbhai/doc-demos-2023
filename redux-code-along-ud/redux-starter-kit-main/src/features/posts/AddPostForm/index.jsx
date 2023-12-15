import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { selectAllUsers } from '../../users/usersSlice'
import { useAddNewPostMutation } from '../../../api/apiSlice'

const AddPostForm = () => {
  // states
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  // dispatch and selector
  const [addNewPost, { isLoading }] = useAddNewPostMutation()
  const users = useSelector(selectAllUsers)

  // events
  const handleTitleChange = (e) => setTitle(e.target.value)
  const handleContentChange = (e) => setContent(e.target.value)
  const handleAuthorChange = (e) => setUserId(e.target.value)

  // eslint-disable-next-line
  const canSave = [title, content, userId].every(Boolean) && !isLoading
  const handleSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({ title, content, user: userId }).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      }

      setTitle('')
      setContent('')
    }
  }

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a new post</h2>

      <form>
        <label htmlFor="postTitle">
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={handleTitleChange}
          />
          Post Title:
        </label>

        <label htmlFor="postContent">
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={handleContentChange}
          />
          Post Content:
        </label>

        <label htmlFor="postAuthor">
          <select id="postAuthor" value={userId} onChange={handleAuthorChange}>
            <option value="">-- SELECT --</option>
            {usersOptions}
          </select>
          Author:
        </label>

        <button
          type="button"
          onClick={handleSavePostClicked}
          disabled={!canSave}
        >
          Save
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
