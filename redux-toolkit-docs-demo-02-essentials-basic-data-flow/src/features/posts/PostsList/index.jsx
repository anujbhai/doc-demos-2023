import { useSelector } from "react-redux";

import { selectAllPosts } from "../postsSlice";

const PostsList = () => {
  // eslint-disable-next-line no-unused-vars
  const posts = useSelector(selectAllPosts);
};

export default PostsList;
