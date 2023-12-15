import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

import PostAuthor from '../PostAuthor'
import TimeAgo from '../TimeAgo'
import ReactionButtons from '../ReactionButtons'
import Spinner from '../../../components/Spinner'
import { useGetPostsQuery } from '../../../api/apiSlice'

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

const PostsList = () => {
  const {
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetPostsQuery()

  const sortedPosts = useMemo(() => {
    const sorted = posts.slice()
    sorted.sort((a, b) => b.date.localeCompare(a.date))

    return sorted
  })

  let content

  if (isLoading) {
    content = <Spinner className="loader" text="Loading..." />
  } else if (isSuccess) {
    const renderedPosts = sortedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ))

    const containerClassname = classNames('post-container', {
      disabled: isFetching,
    })

    content = <div className={containerClassname}>{renderedPosts}</div>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>

      <button type="button" onClick={refetch}>
        Refetch Posts
      </button>

      {content}
    </section>
  )
}

PostExcerpt.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    user: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
}

export default PostsList
