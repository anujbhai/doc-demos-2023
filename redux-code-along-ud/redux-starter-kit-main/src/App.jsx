import React from 'react'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import PostsList from './features/posts/PostsList'
import AddPostForm from './features/posts/AddPostForm'
import SinglePostPage from './features/posts/SinglePostPage'
import EditPostForm from './features/posts/EditPostForm'
import UsersList from './features/users/UsersList'
import SingleUserPage from './features/users/SingleUserPage'
import NotificationsList from './features/notifications/NotificationsList'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddPostForm />
                <PostsList />
              </>
            }
          />
          <Route
            path="/posts/:postId"
            element={<SinglePostPage />}
          />
          <Route
            path="/editPost/:postId"
            element={<EditPostForm />}
          />
          <Route
            path="/users"
            element={<UsersList />}
          />
          <Route
            path="/users/:userId"
            element={<SingleUserPage />}
          />
          <Route
            path="/notifications"
            element={<NotificationsList />}
          />
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App

