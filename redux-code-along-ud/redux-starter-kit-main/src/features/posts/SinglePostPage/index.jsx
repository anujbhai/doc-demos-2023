import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

import PostAuthor from '../PostAuthor'
import TimeAgo from '../TimeAgo'
import ReactionButtons from '../ReactionButtons'
import Spinner from '../../../components/Spinner'
import { useGetPostQuery } from '../../../api/apiSlice'

const SinglePostPage = () => {
  const { postId } = useParams()

  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId)

  let content

  if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>

        <div>
          <blockquote>
            <PostAuthor userId={post.user} />
          </blockquote>

          <p>
            <TimeAgo timestamp={post.date} />
          </p>
        </div>

        <p className="post-content">{post.content}</p>

        <ReactionButtons post={post} />

        <NavLink to={`/editPost/${post.id}`} className="button">
          Edit
        </NavLink>
      </article>
    )
  }

  return <section>{content}</section>
}

export default SinglePostPage
