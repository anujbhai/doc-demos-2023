import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '../../api/apiSlice'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

export const extendApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (responseData) =>
        usersAdapter.setAll(initialState, responseData), // eslint-disable-line
    }),
  }),
})
export const { useGetUsersQuery } = extendApiSlice
export const selectUsersResult = apiSlice.endpoints.getUsers.select()

const emptyUsers = []

export const selectAllUsers = createSelector(
  selectUsersResult,
  (usersResult) => usersResult?.data ?? emptyUsers,
)

export const selectUserById = createSelector(
  selectAllUsers,
  (state, userId) => userId,
  (users, userId) => users.find((user) => user.id === userId),
)
