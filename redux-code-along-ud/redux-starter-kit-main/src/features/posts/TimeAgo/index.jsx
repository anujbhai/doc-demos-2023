import { formatDistanceToNow, parseISO } from 'date-fns'

const TimeAgo = (props) => {
  const { timestamp } = props

  let timeago = ''

  if (timestamp) {
    const date = parseISO(timestamp)
    const timeperiod = formatDistanceToNow(date)

    timeago = ` ${timeperiod} ago`
  }

  return (
    <span title={timestamp}>
      <i>{timeago}</i>
    </span>
  )
}

export default TimeAgo
