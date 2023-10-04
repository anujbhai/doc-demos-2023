import { useSelector } from 'react-redux'
import {NavLink, useParams} from 'react-router-dom'

const PostPage = () => {
  const { postId } = useParams()

  const post = useSelector(state => state.posts.find(post => post.id === postId))

  if (!post) return (<section><h2>Post not found</h2></section>)

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>

        <p className="post-content">{post.content}</p>

        <NavLink to={`/editPosts/${post.id}`} className="button">Edit post</NavLink>
      </article>
    </section>
  )
}

export default PostPage

