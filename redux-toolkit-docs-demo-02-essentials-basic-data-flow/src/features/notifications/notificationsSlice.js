import {
  createAction,
  createEntityAdapter,
  createSelector,
  createSlice,
  isAnyOf
} from "@reduxjs/toolkit"

import { apiSlice } from "../api/apiSlice"
import { forceGenerateNotifications } from "../../api/server"

const notificationsRecieved = createAction(
  'notifications/notificationsRecieved'
)

export const extendApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query({
      query: () => 'notifications',
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, dispatch }
      ) {
        const ws = new WebSocket('ws://localhost')

        try {
          await cacheDataLoaded

          const listener = e => {
            const message = JSON.parse(e.data)

            switch (message.type) {
              case 'notifications': {
                updateCachedData((draft) => {
                  draft.push(...message.payload)
                  draft.sort((a, b) => b.date.localeCompare(a.date))
                })

                dispatch(notificationsRecieved(message.payload))
                break
              }
              default:
                break
            }
          }

          ws.addEventListener('message', listener)
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }

        ws.close()
      },
    }),
  }),
})

export const { useGetNotificationsQuery } = extendApi

const emptyNotifications = []

export const selectNotificationsResult = extendApi.endpoints.getNotifications.select()

const selectNotificationsData = createSelector(
  selectNotificationsResult,
  (notificationsResult) => notificationsResult?.data ?? emptyNotifications
)

export const fetchNotificationsWebsocket = () => (dispatch, getState) => {
  const allNotifications = selectNotificationsData(getState())
  const [latestNotification] = allNotifications
  const latestTimestamp = latestNotification?.date ?? ''

  forceGenerateNotifications(latestTimestamp)
}

const notificationsAdapter = createEntityAdapter()

const matchNotificationsRecieved = isAnyOf(
  notificationsRecieved,
  extendApi.endpoints.getNotifications.matchFulfilled
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    // eslint-disable-next-line no-unused-vars
    allNotificationsRead(state, action) {
      Object.values(state.entities).forEach((notification) => {
        notification.read = true
      })
    },
  },
  extraReducers(builder) {
    builder.addMatcher(matchNotificationsRecieved, (state, action) => {
      const notificationsMetadata = action.payload.map((notification) => ({
        id: notification.id,
        read: false,
        isNew: true,
      }))

      Object.values(state.entities).forEach((notification) => {
        notification.isNew = !notification.read
      })

      notificationsAdapter.upsertMany(state, notificationsMetadata)
    })
  },
})

export const { allNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer

export const {
  selectAll: selectNotificationsMetadata,
  selectEntities: selectMetadataEntities,
} = notificationsAdapter.getSelectors((state) => state.notifications)

