import { useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"

import PostAuthor from "../PostAuthor"
import TimeAgo from "../TimeAgo"
import ReactionButtons from "../ReactionButtons"

const SinglePostPage = () => {
  const { postId } = useParams()

  const post = useSelector(state => state.posts.find(post => post.id === postId))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{ post.title }</h2>

        <p className="post-content">{ post.content }</p>

        <ReactionButtons post={ post } />

        <blockquote>
          <PostAuthor userId={ post.user } />
        </blockquote>

        <p>
          <TimeAgo timestamp={ post.date } />
        </p>

        <NavLink
          to={ `/editPost/${ post.id }` }
          className='button'
        >Edit</NavLink>
      </article>
    </section>
  )
}

export default SinglePostPage

