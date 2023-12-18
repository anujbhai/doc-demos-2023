import React from 'react'
import PropTypes from 'prop-types'
// import { useDispatch } from 'react-redux'

// import { reactionAdded } from '../postsSlice'
import { useAddReactionMutation } from '../../../api/apiSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

const ReactionButtons = (props) => {
  const { post } = props
  const [addReaction] = useAddReactionMutation()
  // const dispatch = useDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(
    ([reactionName, emoji]) => (
      <button
        key={reactionName}
        type="button"
        className="muted-button reaction-button"
        onClick={() => addReaction({ postId: post.id, reaction: reactionName })}
      >
        {emoji} {post.reactions[reactionName]} {/* eslint-disable-line */}
      </button>
    ),
  )

  return <div>{reactionButtons}</div>
}

ReactionButtons.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    reactions: PropTypes.shape({
      thumbsUp: PropTypes.number.isRequired,
      hooray: PropTypes.number.isRequired,
      heart: PropTypes.number.isRequired,
      rocket: PropTypes.number.isRequired,
      eyes: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
}

export default ReactionButtons
