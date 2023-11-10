import { useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { formatDistanceToNow, parseISO } from "date-fns"
import classnames from "classnames"

import { allNotificationsRead, selectMetadataEntities, useGetNotificationsQuery } from "../notificationsSlice"
import { selectAllUsers } from "../../users/usersSlice"

const NotificationsList = () => {
  const dispatch = useDispatch()
  const { data: notifications = [] } = useGetNotificationsQuery
  const notificationsMetadata = useSelector(selectMetadataEntities)
  const users = useSelector(selectAllUsers)

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map(notification => {
    const data = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(data)
    const user = users.find(user => user.id === notification.user) || {
      name: 'Unknown User',
    }

    // eslint-disable-next-line no-unused-vars
    const metadata = notificationsMetadata[notification.id]

    const notificationClassname = classnames('notification', {
      new: notification.isNew,
    })

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>

        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section className="notificationList">
      <h2>Notifications</h2>

      {renderedNotifications}
    </section>
  )
}

export default NotificationsList

