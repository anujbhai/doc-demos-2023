import React from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import PostAuthor from "../PostAuthor"
import TimeAgo from "../TimeAgo"
import ReactionButtons from "../ReactionButtons"

const PostsList = () => {
  const posts = useSelector(state => state.posts)

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map(post => (
    <article className="post-excerpt" key={ post.id }>
      <h3>{ post.title }</h3>

      <p className="post-content">
        { post.content.substring(0, 100) }
      </p>

      <ReactionButtons post={ post } />

      <NavLink
        to={ `/posts/${post.id}` }
        className="button muted-button"
      >View post</NavLink> {' '}

      <footer className="post-list-item-footer">
        <PostAuthor userId={ post.user } />
        <TimeAgo timestamp={ post.date } />
      </footer>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>

      { renderedPosts }
    </section>
  )
}

export default PostsList
