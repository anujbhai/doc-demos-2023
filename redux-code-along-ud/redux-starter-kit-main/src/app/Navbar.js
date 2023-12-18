import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import {
  fetchNotificationsWebsocket,
  selectNotificationsMetadata,
  useGetNotificationsQuery,
} from '../features/notifications/notificationsSlice'

const Navbar = () => {
  const dispatch = useDispatch()

  useGetNotificationsQuery()

  const notificationsMetaData = useSelector(selectNotificationsMetadata)
  const numUnreadNotifications = notificationsMetaData.filter(
    (n) => !n.read,
  ).length
  const fetchNewNotifications = () => dispatch(fetchNotificationsWebsocket())

  // const notifications = () => dispatch(fetchNotificationsWebsocket())

  let unreadNotificationsBadge

  if (numUnreadNotifications > 0) {
    unreadNotificationsBadge = (
      <span className="badge">{numUnreadNotifications}</span>
    )
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <NavLink to="/" className="active">
              Posts
            </NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/notifications">
              notifications
              {unreadNotificationsBadge}
            </NavLink>
          </div>

          <button
            type="button"
            className="button"
            onClick={fetchNewNotifications}
          >
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}

export default Navbar
