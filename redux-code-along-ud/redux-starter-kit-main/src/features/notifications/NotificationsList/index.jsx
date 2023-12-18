import React, { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'
import classNames from 'classnames'

import {
  allNotificationsRead,
  selectMetadataEntities,
  useGetNotificationsQuery,
} from '../notificationsSlice'
import { selectAllUsers } from '../../users/usersSlice'

const NotificationsList = () => {
  const dispatch = useDispatch()
  const { data: notifications = [] } = useGetNotificationsQuery()
  const notificationsMetadata = useSelector(selectMetadataEntities)
  const users = useSelector(selectAllUsers)

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    // eslint-disable-next-line
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown user',
    }

    const metaData = notificationsMetadata[notification.id]

    const notificationsClassName = classNames('notification', {
      new: metaData.isNew,
    })

    return (
      <div key={notification.id} className={notificationsClassName}>
        <div>
          {/* eslint-disable-next-line */}
          <b>{user.name}</b> {notification.message}
        </div>

        <div title={notification.date}>
          {/* eslint-disable-next-line */}
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>

      {renderedNotifications}
    </section>
  )
}

export default NotificationsList
