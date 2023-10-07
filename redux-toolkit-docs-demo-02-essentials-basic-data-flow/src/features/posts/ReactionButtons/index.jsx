import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { reactionAdded } from "../postsSlice";

const reactionEmoji = {
  thumbsup: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

const ReactionButtons = (props) => {
  const { post } = props;

  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          dispatch(reactionAdded({
            type: "posts/reactionAdded",
            payload: { postId: post.id, reaction: name },
          }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

ReactionButtons.propTypes = {
  post: PropTypes.shape({
    reactions: PropTypes.objectOf(PropTypes.number),
    id: PropTypes.string,
  }).isRequired,
};

export default ReactionButtons;
