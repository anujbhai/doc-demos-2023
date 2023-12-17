import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { NavLink, useParams } from 'react-router-dom'

import { selectUserById } from '../usersSlice'
import { useGetPostsQuery } from '../../../api/apiSlice'

const SingleUserPage = () => {
  const { userId } = useParams()
  const user = useSelector((state) => selectUserById(state, userId))
  const selectPostsForUser = useMemo(() => {
    const emptyArray = []

    return createSelector(
      (res) => res.data,
      (res, userId) => userId, // eslint-disable-line
      (
        data,
        userId, // eslint-disable-line
      ) => data?.filter((post) => post.user === userId) || emptyArray, // eslint-disable-line
    )
  })

  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      postsForUser: selectPostsForUser(result, userId),
    }),
  })

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  )
}

export default SingleUserPage
