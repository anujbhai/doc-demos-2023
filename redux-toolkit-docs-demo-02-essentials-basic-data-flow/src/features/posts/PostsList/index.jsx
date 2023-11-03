import { useDispatch, useSelector } from "react-redux";

import { fetchPosts, selectAllPosts } from "../postsSlice";

const PostsList = () => {
  // eslint-disable-next-line no-unused-vars
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();

  dispatch(fetchPosts())
};

export default PostsList;
