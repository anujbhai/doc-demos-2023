import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetPostQuery, useEditPostMutation } from '../../../api/apiSlice'

const EditPostForm = () => {
  const { postId } = useParams()
  const { data: post } = useGetPostQuery(postId)
  // eslint-disable-next-line
  const [updatePost, { isLoading }] = useEditPostMutation()
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const navigate = useNavigate()

  const handleTitleChange = (e) => setTitle(e.target.value)
  const handleContentChange = (e) => setContent(e.target.value)

  const handleSavePostClicked = async () => {
    if (title && content) {
      await updatePost({ id: postId, title, content })

      navigate(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit post</h2>

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

        <button type="button" onClick={handleSavePostClicked}>
          Save
        </button>
      </form>
    </section>
  )
}

export default EditPostForm
