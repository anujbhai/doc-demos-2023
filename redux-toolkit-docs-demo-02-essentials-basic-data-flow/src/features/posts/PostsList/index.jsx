import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import PostAuthor from "../PostAuthor";
import TimeAgo from "../TimeAgo";

const PostsList = () => {
  const posts = useSelector((state) => state.posts);
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <NavLink to={`/posts/${post.id}`} className="button muted-button">View Post</NavLink>
      </article>
    );
  });

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
