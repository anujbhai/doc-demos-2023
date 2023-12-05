import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchNotifications, selectAllNotifications } from '../features/notifications/notificationsSlice'

export const Navbar = () => {
  const dispatch = useDispatch()
  const fetchNewNotifications = () => dispatch(fetchNotifications())

  const notifications = useSelector(selectAllNotifications)
  const numUnreadNotifications = notifications.filter(n => !n.read).length

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
            <NavLink to="/" className="active">Posts</NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/notifications">Notifications {unreadNotificationsBadge}</NavLink>
          </div>

          <button
            className="button"
            onClick={fetchNewNotifications}
          >Refresh Notifications</button>
        </div>
      </section>
    </nav>
  )
}
