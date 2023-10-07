import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  { id: '0', name: 'Taro' },
  { id: '1', name: 'Jiro' },
  { id: '2', name: 'Saburo' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export default usersSlice.reducer

