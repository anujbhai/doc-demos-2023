import { useSelector } from "react-redux";

import { selectPostById } from "../postsSlice";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { postId } = useParams();

  // eslint-disable-next-line no-unused-vars
  const post = useSelector((state) => selectPostById(state, postId));
};

export default PostPage;
