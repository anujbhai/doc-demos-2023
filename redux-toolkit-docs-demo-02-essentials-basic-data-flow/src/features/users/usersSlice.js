import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"

import { apiSlice } from "../api/apiSlice"

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (response) => {
        return usersAdapter.setAll(initialState, response)
      },
    }),
  }),
})

export const { useGetUsersQuery } = extendedApiSlice
export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
)

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)




