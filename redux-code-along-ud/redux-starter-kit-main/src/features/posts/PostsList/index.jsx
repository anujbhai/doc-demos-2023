import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import PostAuthor from '../PostAuthor'
import TimeAgo from '../TimeAgo'
import ReactionButtons from '../ReactionButtons'
import Spinner from '../../../components/Spinner'
import { fetchPosts, selectPostById, selectPostIds } from '../postsSlice'

let PostExcerpt = (props) => {
  const { post } = props
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <NavLink to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </NavLink>
    </article>
  )
}

PostExcerpt = memo(PostExcerpt)

function PostsList() {
  const dispatch = useDispatch()
  // const posts = useSelector(selectAllPosts)
  const orderedPosts = useSelector(selectPostIds)

  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <Spinner className="loader" text="Loading..." />
  } else if (postStatus === 'succeeded') {
    content = orderedPosts.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ))
  } else if (postStatus === 'error') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>

      {content}
    </section>
  )
}

PostsList.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
}

export default PostsList
